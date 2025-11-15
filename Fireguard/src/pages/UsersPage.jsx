import React, { useEffect, useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { firestore } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";

function formatDate(ts) {
  if (!ts) return "-";
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  } catch (e) {
    return String(ts);
  }
}

function initials(name, email) {
  if (name) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("user");
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    user: null,
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const col = collection(firestore, "users");
    const qRef = query(col, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      qRef,
      (snap) => {
        const list = [];
        snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        setUsers(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load users:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const text = (u.displayName || u.email || "").toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (roleFilter !== "all" && (u.role || "user") !== roleFilter)
        return false;
      return true;
    });
  }, [users, q, roleFilter]);

  const totals = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => (u.role || "user") === "admin").length;
    const regular = total - admins;
    const now = Date.now();
    const active = users.filter((u) => {
      const ts =
        u.createdAt && u.createdAt.toDate
          ? u.createdAt.toDate().getTime()
          : null;
      return ts && now - ts < 7 * 24 * 60 * 60 * 1000;
    }).length;
    return { total, admins, regular, active };
  }, [users]);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-gray-500">
            Manage your team members and their account permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-white border rounded-md px-3 py-2 shadow-sm">
            <svg
              className="w-4 h-4 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              ></path>
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or email..."
              className="outline-none text-sm"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setRoleFilter("all")}
              className={`px-3 py-1 rounded-full border ${
                roleFilter === "all"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 bg-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setRoleFilter("admin")}
              className={`px-3 py-1 rounded-full border ${
                roleFilter === "admin"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 bg-white"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setRoleFilter("user")}
              className={`px-3 py-1 rounded-full border ${
                roleFilter === "user"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 bg-white"
              }`}
            >
              User
            </button>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-semibold">{totals.total}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Administrators</div>
          <div className="text-2xl font-semibold">{totals.admins}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Regular Users</div>
          <div className="text-2xl font-semibold">{totals.regular}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500">Active Now</div>
          <div className="text-2xl font-semibold">{totals.active}</div>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading users...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between relative"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold`}
                  style={{
                    backgroundColor: u.role === "admin" ? "#6d28d9" : "#06b6d4",
                  }}
                >
                  {initials(u.displayName, u.email)}
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {u.displayName || u.email || "User"}
                  </div>
                  <div className="text-sm text-gray-500">{u.email || "-"}</div>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                    <span className="text-xs text-gray-400 ml-3">
                      Joined {formatDate(u.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === u.id ? null : u.id)
                    }
                    className="p-2 rounded-full hover:bg-gray-100"
                    aria-haspopup="true"
                    aria-expanded={openMenuId === u.id}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                  </button>

                  {openMenuId === u.id && (
                    <div
                      className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-sm z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setEditName(u.displayName || "");
                          setEditRole(u.role || "user");
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-600"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          setOpenMenuId(null);
                          // Prevent deleting the currently signed-in user
                          const currentUid = auth?.currentUser?.uid;
                          if (currentUid && u.id === currentUid) {
                            alert(
                              "You cannot delete the currently signed-in user."
                            );
                            return;
                          }
                          setDeleteConfirm({ open: true, user: u });
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-500"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
                          <path d="M10 11v6"></path>
                          <path d="M14 11v6"></path>
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editingUser && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
          onClick={() => setEditingUser(null)}
        >
          <div
            className="w-full max-w-lg rounded-lg overflow-hidden shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"></path>
                    <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">Edit User</div>
                  <div className="text-xs opacity-80">
                    Update user information
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-white/90 hover:text-white"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="bg-white p-6">
              {/* Email card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 flex items-center gap-4 border">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold`}
                  style={{
                    backgroundColor:
                      editingUser.role === "admin" ? "#6d28d9" : "#06b6d4",
                  }}
                >
                  {initials(editingUser.displayName, editingUser.email)}
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email Address</div>
                  <div className="text-sm font-medium">{editingUser.email}</div>
                </div>
              </div>

              {/* Full Name */}
              <label className="block text-sm text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5 text-gray"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"></path>
                    <path d="M6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1"></path>
                  </svg>
                </div>
                <input
                  className="flex-1 border border-gray-200 rounded-md px-3 py-2"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              {/* Role */}
              <label className="block text-sm text-gray-700 mb-1">Role *</label>
              <div className="mb-2">
                <select
                  className="w-full border border-gray-200 rounded-md px-3 py-2"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                >
                  <option value="admin">Admin - Full Access</option>
                  <option value="user">User - Limited Access</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 mb-4">
                {editRole === "admin"
                  ? "Admins have full access to all features and settings"
                  : "Users have limited access"}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-md bg-white border text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!editingUser) return;
                    try {
                      await updateDoc(doc(firestore, "users", editingUser.id), {
                        displayName: editName || null,
                        role: editRole || "user",
                      });
                      setEditingUser(null);
                    } catch (err) {
                      console.error("Failed to update user:", err);
                      alert("Failed to update user. See console for details.");
                    }
                  }}
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && deleteConfirm.user && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          onClick={() => setDeleteConfirm({ open: false, user: null })}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100">
                <FaTrash className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete user
                </h3>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-700 mb-6">
              Delete{" "}
              <span className="font-semibold">
                {deleteConfirm.user.displayName ||
                  deleteConfirm.user.email ||
                  deleteConfirm.user.id}
              </span>
              ? This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => setDeleteConfirm({ open: false, user: null })}
                disabled={processing}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                onClick={async () => {
                  if (!deleteConfirm.user) return;
                  try {
                    setProcessing(true);
                    await deleteDoc(
                      doc(firestore, "users", deleteConfirm.user.id)
                    );
                    setDeleteConfirm({ open: false, user: null });
                  } catch (err) {
                    console.error("Failed to delete user:", err);
                    alert("Failed to delete user. See console for details.");
                  } finally {
                    setProcessing(false);
                  }
                }}
                disabled={processing}
              >
                {processing ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
