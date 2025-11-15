import React, { useEffect, useState, useMemo } from "react";
import { firestore } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
              className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between"
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
                <button className="p-2 rounded-full hover:bg-gray-100">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
