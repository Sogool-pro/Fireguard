const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure your email service here
// For Gmail, use App Passwords: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "your-email@gmail.com",
    pass: process.env.GMAIL_PASS || "your-app-password",
  },
});

// Function to send temporary password email
exports.sendTemporaryPassword = functions.https.onCall(
  async (data, context) => {
    const { email, displayName, tempPassword } = data;

    if (!email || !tempPassword) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Email and temporary password are required"
      );
    }

    try {
      const mailOptions = {
        from: process.env.GMAIL_USER || "your-email@gmail.com",
        to: email,
        subject: "Welcome to FireGuard - Temporary Password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Welcome to FireGuard!</h2>
            <p>Dear ${displayName || "User"},</p>
            <p>Your account has been successfully created. Use the temporary password below to log in for the first time:</p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 12px; color: #6b7280;">Temporary Password:</p>
              <p style="margin: 10px 0; font-size: 24px; font-weight: bold; font-family: monospace; color: #dc2626;">
                ${tempPassword}
              </p>
            </div>
            
            <p style="color: #ef4444; font-weight: bold;">⚠️ Important:</p>
            <ul>
              <li>This is a temporary password. You must change it after your first login.</li>
              <li>Do not share this password with anyone.</li>
              <li>This password will expire after 24 hours if not used.</li>
            </ul>
            
            <p><strong>Email:</strong> ${email}</p>
            
            <p style="margin-top: 30px;">
              <a href="http://localhost:5173/login" style="background-color: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Log In to FireGuard
              </a>
            </p>
            
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              If you did not create this account, please contact support immediately.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email sent successfully" };
    } catch (error) {
      console.error("Error sending email:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error sending email: " + error.message
      );
    }
  }
);

// Function to check if user has changed password (on first login)
exports.checkPasswordChanged = functions.auth.user().onCreate(async (user) => {
  // Mark user as needing password change
  try {
    await admin.firestore().collection("users").doc(user.uid).update({
      needsPasswordChange: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating user document:", error);
  }
});
