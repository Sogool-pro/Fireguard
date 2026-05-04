import React, { useEffect, useState, useMemo } from "react";
import {
  Check,
  Mail,
  Pencil,
  Plus,
  Search,
  Shield,
  Trash2,
  User as UserIcon,
  UserPlus,
  X,
} from "lucide-react";
import { firestore, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useToast } from "../context/ToastContext";
import emailjs from "@emailjs/browser";

// Initialize EmailJS
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

function formatDate(ts) {
  if (!ts) return "-";
  try {
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  } catch {
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

function roleLabel(role) {
  const normalized = (role || "user").toLowerCase();
  if (normalized === "admin") return "Administrator";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function avatarColor(role) {
  const normalized = (role || "user").toLowerCase();
  if (normalized === "admin") return "#bf2d2d";
  if (normalized === "operator") return "#1d4ed8";
  return "#71717a";
}

function roleBadgeClass(role) {
  const normalized = (role || "user").toLowerCase();
  if (normalized === "admin") {
    return "border-[#fecaca] bg-[#fef2f2] text-[#bf2d2d]";
  }
  if (normalized === "operator") {
    return "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]";
  }
  return "border-[#e4e4e0] bg-[#f4f4f2] text-[#71717a]";
}

const rolePermissionRows = [
  {
    permission: "View Dashboard & Alerts",
    admin: "Yes",
    user: "Yes",
  },
  {
    permission: "View Logs",
    admin: "Yes",
    user: "Yes",
  },
  {
    permission: "Add Manual Records",
    admin: "Yes",
    user: "Yes",
  },
  {
    permission: "Manage Rooms & Nodes",
    admin: "Yes",
    user: "No",
  },
  {
    permission: "Manage Users",
    admin: "Yes",
    user: "No",
  },
  {
    permission: "System Settings",
    admin: "Yes",
    user: "No",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { showToast } = useToast();
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("user");
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    user: null,
  });
  const [processing, setProcessing] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    role: "user",
  });
  const [creatingUser, setCreatingUser] = useState(false);

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
      },
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    return users
      .filter((u) => !u.isDeleted) // Hide deleted users from the list
      .filter((u) => {
        const text = (u.displayName || u.email || "").toLowerCase();
        if (q && !text.includes(q.toLowerCase())) return false;
        if (roleFilter !== "all" && (u.role || "user") !== roleFilter)
          return false;
        return true;
      });
  }, [users, q, roleFilter]);

  const totals = useMemo(() => {
    const visibleUsers = users.filter((u) => !u.isDeleted);
    const total = visibleUsers.length;
    const admins = visibleUsers.filter(
      (u) => (u.role || "user") === "admin",
    ).length;
    const regular = total - admins;
    return { total, admins, regular };
  }, [users]);

  const filterButtonClass = (value) =>
    `h-9 rounded-lg border px-3 text-xs font-medium transition-colors ${
      roleFilter === value
        ? "border-[#fecaca] bg-[#fef2f2] text-[#bf2d2d]"
        : "border-[#e4e4e0] bg-white text-[#71717a] hover:bg-[#fafaf8] hover:text-[#18181b]"
    }`;

  const openEditUser = (user) => {
    setEditingUser(user);
    setEditName(user.displayName || "");
    setEditRole(user.role || "user");
  };

  const openDeleteConfirm = (user) => {
    const currentUid = auth?.currentUser?.uid;
    if (currentUid && user.id === currentUid) {
      alert("You cannot delete the currently signed-in user.");
      return;
    }
    setDeleteConfirm({ open: true, user });
  };

  return (
    <div
      className="min-h-full p-4 text-[#18181b] sm:p-6 lg:p-[30px]"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(191,45,45,0.045), transparent 34%), linear-gradient(180deg, #f7f6f3 0%, #efeeeb 100%)",
      }}
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-1.5 font-mono text-micro uppercase tracking-[0.14em] text-[#a1a1aa]">
            Access Control
          </div>
          <h1 className="text-2xl font-bold leading-tight tracking-normal text-[#18181b]">
            Team Members
          </h1>
          <p className="mt-2 max-w-2xl text-detail leading-6 text-[#71717a]">
            Manage access and permissions for your monitoring team.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e0] bg-white/75 px-3 py-2 font-mono text-label text-[#71717a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16803c] shadow-[0_0_0_3px_#f0fdf4]" />
            Live roster
          </div>
          <button
            type="button"
            onClick={() => setAddUserModal(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#bf2d2d] bg-[#bf2d2d] px-4 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(191,45,45,0.16)] transition-colors hover:bg-[#a52424]"
          >
            <Plus className="h-4 w-4" />
            Invite User
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-[rgba(24,24,27,0.075)] bg-white/90 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.055)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#eeeeeb] bg-[#fafaf8] px-3 py-2">
              <div className="font-mono text-micro uppercase tracking-[0.08em] text-[#a1a1aa]">
                Total
              </div>
              <div className="mt-1 font-mono text-xl text-[#18181b]">
                {totals.total}
              </div>
            </div>
            <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2">
              <div className="font-mono text-micro uppercase tracking-[0.08em] text-[#bf2d2d]">
                Admin
              </div>
              <div className="mt-1 font-mono text-xl text-[#bf2d2d]">
                {totals.admins}
              </div>
            </div>
            <div className="rounded-lg border border-[#eeeeeb] bg-[#fafaf8] px-3 py-2">
              <div className="font-mono text-micro uppercase tracking-[0.08em] text-[#a1a1aa]">
                Users
              </div>
              <div className="mt-1 font-mono text-xl text-[#18181b]">
                {totals.regular}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#e4e4e0] bg-[#fafaf8] px-3 sm:w-72">
              <Search className="h-4 w-4 flex-none text-[#a1a1aa]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or email"
                className="w-full min-w-0 bg-transparent text-sm text-[#18181b] outline-none placeholder:text-[#a1a1aa]"
              />
            </label>
            <div className="grid grid-cols-3 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => setRoleFilter("all")}
                className={filterButtonClass("all")}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter("admin")}
                className={filterButtonClass("admin")}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter("user")}
                className={filterButtonClass("user")}
              >
                User
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-[13px] md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[170px] animate-pulse rounded-xl border border-[#e4e4e0] bg-white/75 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#eeeeeb]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-[#eeeeeb]" />
                  <div className="h-3 w-3/4 rounded bg-[#eeeeeb]" />
                  <div className="h-5 w-24 rounded bg-[#eeeeeb]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[13px]">
            {filtered.length === 0 && (
              <div className="col-span-full rounded-xl border border-[#e4e4e0] bg-white/90 p-8 text-center shadow-[0_12px_28px_rgba(15,23,42,0.055)]">
                <div className="text-sm font-semibold text-[#18181b]">
                  No users found
                </div>
                <div className="mt-1 text-xs text-[#71717a]">
                  Try another search term or role filter.
                </div>
              </div>
            )}

            {filtered.map((u) => (
              <article
                key={u.id}
                className="flex min-h-[172px] items-start gap-3.5 rounded-xl border border-[rgba(24,24,27,0.075)] bg-white/95 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.055)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.09)]"
              >
                <div
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-full text-base font-semibold text-white"
                  style={{ backgroundColor: avatarColor(u.role) }}
                >
                  {initials(u.displayName, u.email)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold tracking-normal text-[#18181b]">
                    {u.displayName || u.email || "User"}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-[#a1a1aa]">
                    {u.email || "-"}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 font-mono text-micro font-medium ${roleBadgeClass(
                        u.role,
                      )}`}
                    >
                      {roleLabel(u.role)}
                    </span>
                    <span className="font-mono text-micro text-[#a1a1aa]">
                      Joined {formatDate(u.createdAt)}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditUser(u)}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-[#e4e4e0] bg-[#fafaf8] px-2.5 text-label font-medium text-[#71717a] transition-colors hover:border-[#71717a]"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteConfirm(u)}
                      className="inline-flex h-7 items-center gap-1 rounded-md border border-[#fecaca] bg-[#fef2f2] px-2.5 text-label font-medium text-[#bf2d2d] transition-colors hover:bg-[#fee2e2]"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <button
              type="button"
              onClick={() => setAddUserModal(true)}
              className="min-h-[172px] rounded-xl border-[1.5px] border-dashed border-[#e4e4e0] bg-[#fafaf8] p-7 text-center transition-colors hover:border-[#bf2d2d] hover:bg-[#fef2f2]"
            >
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eeeeeb] text-[#a1a1aa]">
                <Plus className="h-[18px] w-[18px]" />
              </span>
              <span className="block text-detail font-medium text-[#71717a]">
                Invite a team member
              </span>
              <span className="mt-1 block text-label text-[#a1a1aa]">
                Grant access to monitoring staff
              </span>
            </button>
          </div>

          <div className="mt-7">
            <div className="mb-3 font-mono text-label font-medium uppercase tracking-[0.08em] text-[#a1a1aa]">
              Role Permissions
            </div>
            <div className="overflow-hidden rounded-xl border border-[#e4e4e0] bg-white/95 shadow-[0_12px_28px_rgba(15,23,42,0.055)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap border-b border-[#eeeeeb] bg-[#fbfbf9] px-4 py-3 text-left font-mono text-label font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">
                        Permission
                      </th>
                      <th className="whitespace-nowrap border-b border-[#eeeeeb] bg-[#fbfbf9] px-4 py-3 text-left font-mono text-label font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">
                        Administrator
                      </th>
                      <th className="whitespace-nowrap border-b border-[#eeeeeb] bg-[#fbfbf9] px-4 py-3 text-left font-mono text-label font-medium uppercase tracking-[0.06em] text-[#a1a1aa]">
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rolePermissionRows.map((row) => (
                      <tr
                        key={row.permission}
                        className="transition-colors hover:bg-[#fafaf8]"
                      >
                        <td className="border-b border-[#eeeeeb] px-4 py-3 text-sm font-medium text-[#18181b]">
                          {row.permission}
                        </td>
                        {["admin", "user"].map((roleKey) => {
                          const value = row[roleKey];
                          const allowed = value === "Yes";
                          return (
                            <td
                              key={roleKey}
                              className={`border-b border-[#eeeeeb] px-4 py-3 text-sm font-medium ${
                                allowed ? "text-[#16803c]" : "text-[#bf2d2d]"
                              }`}
                            >
                              <span className="inline-flex items-center gap-1.5">
                                {allowed ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <X className="h-3.5 w-3.5" />
                                )}
                                {value}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit modal */}
      {editingUser && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
          onClick={() => setEditingUser(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
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
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="bg-white p-6">
              {/* Email card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5 flex items-center gap-4 border">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold`}
                  style={{ backgroundColor: avatarColor(editingUser.role) }}
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
                  <UserIcon className="h-5 w-5 text-gray-500" />
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
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-red-600 to-red-700 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {addUserModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setAddUserModal(false)}
        >
          <div
            className="max-w-md w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Add New User</h2>
                  <p className="text-sm text-white/90">
                    Create a new team member account.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAddUserModal(false)}
                className="text-white/90 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6">
              {/* Full Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter full name"
                    value={newUser.fullName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, fullName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="user@example.com"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              {/* Fixed Role Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    value="User - Standard Access"
                    disabled
                    readOnly
                    tabIndex={-1}
                    style={{ color: "#6b7280" }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Users have standard access to features.
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Temporary Password:</strong> A randomly generated
                  password will be created and sent to the user's email address.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setAddUserModal(false);
                    setNewUser({
                      fullName: "",
                      email: "",
                      role: "user",
                    });
                  }}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  disabled={creatingUser}
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!newUser.fullName.trim() || !newUser.email.trim()) {
                      alert("Please fill in all required fields");
                      return;
                    }
                    setCreatingUser(true);
                    try {
                      // Generate temporary password
                      const tempPassword = generateTemporaryPassword();

                      // Create user with Firebase Auth
                      const cred = await createUserWithEmailAndPassword(
                        auth,
                        newUser.email,
                        tempPassword,
                      );
                      const user = cred.user;

                      // Set display name on auth profile
                      if (newUser.fullName) {
                        await updateProfile(user, {
                          displayName: newUser.fullName,
                        });
                      }

                      // Create user document in Firestore
                      await setDoc(doc(firestore, "users", user.uid), {
                        email: user.email || null,
                        displayName: newUser.fullName || null,
                        role: newUser.role || "user",
                        createdAt: serverTimestamp(),
                        needsPasswordChange: true,
                        temporaryPasswordSet: true,
                      });

                      // Send temporary password via EmailJS
                      try {
                        await emailjs.send(
                          EMAILJS_SERVICE_ID,
                          EMAILJS_TEMPLATE_ID,
                          {
                            user_email: newUser.email,
                            user_name: newUser.fullName,
                            temp_password: tempPassword,
                          },
                        );
                        console.log("Email sent successfully!");
                      } catch (emailError) {
                        console.error("Failed to send email:", emailError);
                        // Don't fail, user is created
                      }

                      // Sign out the newly created user to prevent auto-login
                      await signOut(auth);

                      // Reset form and close modal
                      setNewUser({
                        fullName: "",
                        email: "",
                        role: "user",
                      });
                      setAddUserModal(false);
                      alert(
                        "User created successfully! Temporary password sent to email.",
                      );
                    } catch (err) {
                      console.error("Failed to create user:", err);
                      alert("Failed to create user: " + err.message);
                    } finally {
                      setCreatingUser(false);
                    }
                  }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                  disabled={creatingUser}
                >
                  <UserPlus className="w-4 h-4" />
                  {creatingUser ? "Creating..." : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && deleteConfirm.user && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setDeleteConfirm({ open: false, user: null })}
        >
          <div
            className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-red-100">
                <Trash2 className="h-4 w-4 text-red-500" />
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

                    // Soft delete: Mark user as deleted in Firestore
                    // This prevents them from logging in but keeps their auth account for recovery
                    await updateDoc(
                      doc(firestore, "users", deleteConfirm.user.id),
                      {
                        isDeleted: true,
                        deletedAt: serverTimestamp(),
                      },
                    );

                    setDeleteConfirm({ open: false, user: null });
                    showToast(
                      `User ${deleteConfirm.user.displayName || deleteConfirm.user.email} deleted successfully!`,
                      "success",
                    );
                  } catch (err) {
                    console.error("Failed to delete user:", err);
                    showToast(
                      `Failed to delete user: ${err.message || "See console for details"}`,
                      "error",
                    );
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
