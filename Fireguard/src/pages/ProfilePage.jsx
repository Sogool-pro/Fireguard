import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { FaUser, FaLock } from "react-icons/fa";
import { useToast } from "../context/ToastContext";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const { showToast } = useToast();

  // Load user data
  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(
          doc(firestore, "users", auth.currentUser.uid),
        );
        if (userDoc.exists()) {
          setDisplayName(
            userDoc.data().displayName || auth.currentUser.displayName || "",
          );
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold uppercase tracking-tight text-slate-950">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your account information and security preferences.
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="grid gap-10 border-b border-slate-100 px-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-400">
              <FaUser className="text-sm" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Personal Info
              </span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Update your name and contact details.
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Full Name
                </label>
                {editingName ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-medium text-slate-900">
                    {displayName || "Not set"}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Email Address
                </label>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900">
                  {auth.currentUser?.email}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {editingName ? (
                <>
                  <button
                    onClick={handleUpdateName}
                    disabled={loadingName}
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    {loadingName ? "Saving..." : "Save Personal Info"}
                  </button>
                  <button
                    onClick={() => setEditingName(false)}
                    className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditingName(true)}
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Edit Personal Info
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-10 px-8 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-400">
              <FaLock className="text-sm" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Security
              </span>
            </div>
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
              Make sure your password is strong and updated regularly.
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-tight text-slate-950">
                Password
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use the existing password flow to keep your account secure.
              </p>
            </div>
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSuccess={() => {
          // Optional: Show success message
        }}
      />
    </div>
  );
}
