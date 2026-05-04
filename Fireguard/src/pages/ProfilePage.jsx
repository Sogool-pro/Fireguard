import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { FaUser, FaLock } from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [editingName, setEditingName] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isPasswordChangeRequired, setIsPasswordChangeRequired] =
    useState(false);
  const [tempPasswordFromLogin, setTempPasswordFromLogin] = useState("");
  const { showToast } = useToast();

  // Load user data
  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(
          doc(firestore, "users", auth.currentUser.uid),
        );
        if (userDoc.exists()) {
          const userData = userDoc.data();

          setDisplayName(
            userData.displayName || auth.currentUser.displayName || "",
          );
          setUserRole(userData.role || "user");

          if (userData.needsPasswordChange) {
            const storedTempPassword = sessionStorage.getItem("tempPassword");
            if (storedTempPassword) {
              setTempPasswordFromLogin(storedTempPassword);
            }
            setIsPasswordChangeRequired(true);
            setShowChangePasswordModal(true);
          }
        }
      }
    };
    getUser();
  }, []);

  // Handle update display name
  const handleUpdateName = async () => {
    if (!displayName.trim()) {
      showToast("Name cannot be empty", "warning");
      return;
    }
    setLoadingName(true);
    try {
      // Update Firebase Auth
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }
      // Update Firestore
      if (auth.currentUser) {
        await setDoc(
          doc(firestore, "users", auth.currentUser.uid),
          {
            displayName: displayName,
          },
          { merge: true },
        );
      }
      setEditingName(false);
      showToast("Name updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast(`Failed to update name: ${err.message}`, "error");
    } finally {
      setLoadingName(false);
    }
  };

  const email = auth.currentUser?.email || "";
  const displayLabel = displayName || email || "User";
  const profileInitials = displayLabel
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="fg-page">
      <div className="fg-page-head">
        <div>
          <div className="fg-eyebrow">Account Center</div>
          <div className="fg-heading">Profile & Security</div>
          <div className="fg-description">
            Manage the account used for dashboard access, manual entries, and
            system activity.
          </div>
        </div>
      </div>

      <div className="profile-shell">
        <aside className="profile-overview-card">
          <div className="mb-5 flex items-center gap-4">
            <div className="profile-avatar-lg">{profileInitials || "U"}</div>
            <div className="min-w-0">
              <div className="truncate text-lg font-bold text-[#18181b]">
                {displayLabel}
              </div>
              <div className="mt-1 truncate text-xs text-[#71717a]">{email}</div>
              <div className="mt-2 inline-flex rounded-full border border-[#fecaca] bg-[#fef2f2] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#bf2d2d]">
                {userRole}
              </div>
            </div>
          </div>
          <div className="profile-meta-list">
            <div className="profile-meta-item">
              <span>Role</span>
              <strong>{userRole}</strong>
            </div>
            <div className="profile-meta-item">
              <span>Status</span>
              <strong>Active</strong>
            </div>
            <div className="profile-meta-item">
              <span>Email</span>
              <strong>{email || "-"}</strong>
            </div>
          </div>
        </aside>

        <section className="profile-details-card">
          <div className="p-6">
            <div className="section-mini-title">Personal Information</div>
            <div className="section-mini-copy">
              These details appear in manual records, exports, and account
              activity logs.
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="fg-label mb-2 block">
                  Full Name
                </label>
                {editingName ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="fg-input"
                  />
                ) : (
                  <div className="rounded-[14px] border border-[#e4e4e0] bg-[#fafaf8] px-4 py-3 text-sm font-medium text-[#18181b]">
                    {displayName || "Not set"}
                  </div>
                )}
              </div>

              <div>
                <label className="fg-label mb-2 block">
                  Email Address
                </label>
                <div className="rounded-[14px] border border-[#e4e4e0] bg-[#fafaf8] px-4 py-3 text-sm text-[#18181b]">
                  {email}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {editingName ? (
                <>
                  <button
                    onClick={handleUpdateName}
                    disabled={loadingName}
                    className="fg-btn fg-btn-dark"
                  >
                    {loadingName ? "Saving..." : "Save Personal Info"}
                  </button>
                  <button
                    onClick={() => setEditingName(false)}
                    className="fg-btn"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditingName(true)}
                  className="fg-btn fg-btn-dark"
                >
                  Edit Personal Info
                </button>
              )}
            </div>
            <div className="security-row-v2">
              <div className="security-box-v2">
                <h3 className="flex items-center gap-2">
                  <FaLock className="text-xs text-[#a1a1aa]" />
                  Password
                </h3>
                <p>
                  Use the existing password flow to keep your account secure.
                </p>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="fg-btn fg-btn-dark"
                >
                  Change Password
                </button>
              </div>
              <div className="security-box-v2">
                <h3 className="flex items-center gap-2">
                  <FaUser className="text-xs text-[#a1a1aa]" />
                  Account Activity
                </h3>
                <p>
                  Your account is used in manual entries and system records.
                </p>
                <div className="inline-flex rounded-full border border-[#86efac] bg-[#f0fdf4] px-3 py-2 font-mono text-[11px] text-[#16803c]">
                  Active
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => {
          if (!isPasswordChangeRequired) {
            setShowChangePasswordModal(false);
          }
        }}
        onSuccess={() => {
          setShowChangePasswordModal(false);
          setIsPasswordChangeRequired(false);
          sessionStorage.removeItem("tempPassword");
        }}
        isRequired={isPasswordChangeRequired}
        currentPassword={tempPasswordFromLogin}
      />
    </div>
  );
}
