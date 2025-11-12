import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function Accounts() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to read a 'users' node in the Realtime Database. This is optional —
    // many projects store additional account metadata there. If nothing
    // exists, we'll show a helpful message explaining how to list auth users.
    const usersRef = ref(db, "users");
    const unsub = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setAccounts([]);
        setLoading(false);
        return;
      }
      // data may be object keyed by uid
      const arr = Object.entries(data).map(([key, val]) => ({
        id: key,
        ...val,
      }));
      setAccounts(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Accounts</h2>

      <div className="mb-4 text-sm text-gray-600">
        <div>
          Signed in as:{" "}
          <span className="font-medium">
            {user?.displayName || user?.email || "-"}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Note: this page reads an optional <code>users</code> node in your
          Realtime Database. If you don't see entries below, your project may
          not store account metadata in the DB. Listing all Firebase Auth users
          requires Admin privileges (server-side).
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading accounts...</div>
      ) : accounts.length === 0 ? (
        <div className="text-sm text-gray-500">
          No accounts found in the database.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-xs text-gray-600">#</th>
                <th className="px-4 py-2 text-xs text-gray-600">UID / Key</th>
                <th className="px-4 py-2 text-xs text-gray-600">Name</th>
                <th className="px-4 py-2 text-xs text-gray-600">Email</th>
                <th className="px-4 py-2 text-xs text-gray-600">Role / Meta</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a, i) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-2 align-top text-sm text-gray-700">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-gray-700">
                    {a.id}
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-gray-700">
                    {a.displayName || a.name || "-"}
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-gray-700">
                    {a.email || "-"}
                  </td>
                  <td className="px-4 py-2 align-top text-sm text-gray-700">
                    {a.role || JSON.stringify(a.meta || {})}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
