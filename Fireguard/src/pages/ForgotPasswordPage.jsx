import React, { useState } from "react";
import { auth } from "../firebase";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import fireguardLogo from "../assets/fireguard-logo.png";
import bgAlpha from "../assets/bg-alpha.jpg";

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = "of9oEgeazNJq_sjCb";
const EMAILJS_SERVICE_ID = "service_dnalnvl";
const EMAILJS_TEMPLATE_ID = "template_iddo68t";

emailjs.init(EMAILJS_PUBLIC_KEY);

// Generate temporary password
function generateTemporaryPassword() {
  const length = 12;
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      // Generate temporary password first
      const newTempPassword = generateTemporaryPassword();
      setTempPassword(newTempPassword);

      // Send temporary password via EmailJS
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          user_email: email,
          user_name: email.split("@")[0], // Use email prefix as name
          temp_password: newTempPassword,
        });
        console.log("Password reset email sent successfully!");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        setError("Failed to send email. Please try again.");
        setLoading(false);
        return;
      }

      // Show success message
      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-[1000px] max-w-full h-[640px] rounded-3xl shadow-2xl overflow-hidden">
        {/* Left promotional panel */}
        <div
          className="w-1/2 text-white p-12 relative hidden md:flex flex-col justify-between"
          style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(220, 38, 38, 0.8), rgba(185, 28, 28, 0.7)), url(${bgAlpha})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <h2 className="text-sm opacity-90">Reset Your Password</h2>
            <h1 className="text-3xl md:text-4xl font-semibold mt-6 max-w-md">
              Get back access to your FireGuard account.
            </h1>
            <p className="mt-4 text-sm max-w-lg opacity-90">
              We'll send you a temporary password to your email address.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h3 className="font-semibold">Secure Reset</h3>
                <p className="text-sm opacity-90">
                  Your password reset link is sent securely to your email.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold">Quick Access</h3>
                <p className="text-sm opacity-90">
                  Receive a temporary password instantly via email.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold">Change Anytime</h3>
                <p className="text-sm opacity-90">
                  Update your password in settings after logging in.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8">
          <img src={fireguardLogo} alt="Fireguard Logo" className="w-24 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Enter your email and we'll send you a temporary password
          </p>

          {!success ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Temporary Password"}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Back to Login
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-800 mb-3">
                  ✓ Email Sent!
                </h2>
                <p className="text-sm text-green-700">
                  We've sent a temporary password to your email address.
                </p>
                <p className="text-sm text-green-700 mt-2">
                  Please check your inbox and use the temporary password to log
                  in.
                </p>
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
