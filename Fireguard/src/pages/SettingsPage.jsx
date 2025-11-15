import React, { useState, useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { FaHome, FaEdit, FaArchive, FaTrash } from "react-icons/fa";
import { db } from "../firebase";
import { ref, set, remove, get } from "firebase/database";

export default function SettingsPage() {
  const { rooms, setRooms } = useRoom();

  // local edited names map
  const [edited, setEdited] = useState({});
  const [editingMap, setEditingMap] = useState({});
  // confirmation modal state
  const [confirm, setConfirm] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
    // show an optional "also delete data" checkbox
    showDeleteOption: false,
    deleteOption: true,
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const map = {};
    rooms.forEach((r) => {
      if (r.nodeId) map[r.nodeId] = r.roomName;
    });
    setEdited(map);
    // reset editing states for current rooms
    const editState = {};
    rooms.forEach((r) => {
      if (r.nodeId) editState[r.nodeId] = false;
    });
    setEditingMap(editState);
  }, [rooms]);

  const saveName = async (nodeId) => {
    const name = edited[nodeId] ?? "";
    try {
      await set(ref(db, `room_names/${nodeId}`), name);
      setRooms((prev) =>
        prev.map((r) =>
          r.nodeId === nodeId ? { ...r, roomName: name, customName: name } : r
        )
      );
    } catch (err) {
      console.error("Failed to save room name:", err);
      alert("Failed to save room name");
    }
  };

  const removeRoom = (nodeId) => {
    // default behavior: delete sensor data and related alerts unless caller requests otherwise
    return async function (alsoDelete = true) {
      try {
        if (alsoDelete) {
          await remove(ref(db, `sensor_data/${nodeId}`));
          await remove(ref(db, `room_names/${nodeId}`));
          // Also remove any alerts/logs that reference this nodeId
          try {
            const alertsSnap = await get(ref(db, `alerts`));
            const alerts = alertsSnap.val() || {};
            const removals = [];
            Object.entries(alerts).forEach(([id, alert]) => {
              if (!alert) return;
              // alert may store node as 'NODE1' or under nodeId; remove if it matches
              if (alert.node === nodeId || alert.nodeId === nodeId) {
                removals.push(remove(ref(db, `alerts/${id}`)));
              }
            });
            if (removals.length > 0) await Promise.all(removals);
          } catch (e) {
            console.error("Failed to remove related alerts:", e);
            // don't block room removal on alert cleanup failure
          }
          // remove from local state as well
          setRooms((prev) => prev.filter((r) => r.nodeId !== nodeId));
        } else {
          // If user chose NOT to delete sensor data, persistently hide the room
          // by setting archived=true in room_meta so the RoomContext listener won't re-add it.
          try {
            await set(ref(db, `room_meta/${nodeId}/archived`), true);
          } catch (e) {
            console.error("Failed to set archived flag:", e);
          }
          // Update local state to reflect archived flag so UI hides it immediately
          setRooms((prev) =>
            prev.map((r) =>
              r.nodeId === nodeId ? { ...r, archived: true } : r
            )
          );
        }
      } catch (err) {
        console.error("Failed to remove room:", err);
        alert("Failed to remove room");
      }
    };
  };

  const toggleArchive = async (nodeId) => {
    const current = rooms.find((r) => r.nodeId === nodeId);
    const next = !(current && current.archived);
    try {
      await set(ref(db, `room_meta/${nodeId}/archived`), next);
      setRooms((prev) =>
        prev.map((r) => (r.nodeId === nodeId ? { ...r, archived: next } : r))
      );
    } catch (err) {
      console.error("Failed to toggle archive:", err);
      alert("Failed to update archive status");
    }
  };

  const toggleRepair = async (nodeId) => {
    const current = rooms.find((r) => r.nodeId === nodeId);
    const next = !(current && current.onRepair);
    try {
      await set(ref(db, `room_meta/${nodeId}/onRepair`), next);
      setRooms((prev) =>
        prev.map((r) => (r.nodeId === nodeId ? { ...r, onRepair: next } : r))
      );
    } catch (err) {
      console.error("Failed to toggle repair status:", err);
      alert("Failed to update repair status");
    }
  };

  // helper to open confirmation modal
  const showConfirm = ({ title, message, onConfirm, showDeleteOption }) => {
    setConfirm({
      open: true,
      title,
      message,
      onConfirm,
      showDeleteOption: !!showDeleteOption,
      // default to true to preserve previous behavior when deleting
      deleteOption: true,
    });
  };

  const handleConfirm = async () => {
    if (!confirm.onConfirm) {
      setConfirm({ open: false, title: "", message: "", onConfirm: null });
      return;
    }
    try {
      setProcessing(true);
      // Pass the deleteOption (true/false) to the confirm handler if it accepts it
      await confirm.onConfirm(confirm.deleteOption);
    } catch (err) {
      console.error("Action failed:", err);
      // swallow; action functions already alert on failure
    } finally {
      setProcessing(false);
      setConfirm({ open: false, title: "", message: "", onConfirm: null });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium">Room Management</h3>
        <p className="text-sm text-gray-500">
          Configure and manage your monitored rooms
        </p>
      </div>

      <div className="space-y-4">
        {rooms.length === 0 && (
          <p className="text-sm text-gray-500">No rooms found.</p>
        )}
        {rooms.map((r, idx) => (
          <div
            key={r.nodeId || idx}
            className="bg-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-14 h-14 bg-slate-900/10 rounded-lg flex items-center justify-center">
                <FaHome className="text-2xl md:text-3xl text-gray-800" />
              </div>
              <div className="w-full">
                {/* Title area: show input in edit mode, otherwise plain title */}
                {editingMap[r.nodeId] ? (
                  <input
                    type="text"
                    className="w-full text-lg md:text-xl font-semibold text-slate-900 uppercase border rounded px-3 py-2"
                    value={edited[r.nodeId] ?? r.roomName}
                    onChange={(e) =>
                      setEdited((s) => ({ ...s, [r.nodeId]: e.target.value }))
                    }
                  />
                ) : (
                  <div className="text-base md:text-lg font-semibold text-slate-900 uppercase">
                    {r.roomName}
                  </div>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      r.status === "Active" && !r.archived
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {r.status === "Active" && !r.archived
                      ? "Active"
                      : r.archived
                      ? "Archived"
                      : r.status}
                  </span>
                  <div className="text-xs text-gray-500">
                    Node ID:{" "}
                    <span className="font-medium text-gray-700">
                      {r.nodeId || "unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1"></div>

            <div className="w-full md:w-auto flex items-center gap-3">
              <div className="flex gap-2">
                {editingMap[r.nodeId] ? (
                  <>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full text-sm"
                      onClick={async () => {
                        await saveName(r.nodeId);
                        setEditingMap((s) => ({ ...s, [r.nodeId]: false }));
                      }}
                    >
                      <FaEdit className="w-4 h-4 text-white" />
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                      onClick={() => {
                        setEdited((s) => ({ ...s, [r.nodeId]: r.roomName }));
                        setEditingMap((s) => ({ ...s, [r.nodeId]: false }));
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full text-sm"
                      onClick={() =>
                        setEditingMap((s) => ({ ...s, [r.nodeId]: true }))
                      }
                    >
                      <FaEdit className="w-4 h-4 text-white" />
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-slate-700 text-white rounded-full text-sm flex items-center gap-2"
                      onClick={() =>
                        showConfirm({
                          title: r.archived ? "Unarchive room" : "Archive room",
                          message: r.archived
                            ? `Unarchive ${r.roomName}? It will reappear on the dashboard.`
                            : `Archive ${r.roomName}? It will be hidden from the dashboard but not deleted.`,
                          onConfirm: () => toggleArchive(r.nodeId),
                        })
                      }
                    >
                      <FaArchive className="w-4 h-4 text-white" />
                      {r.archived ? "Unarchive" : "Archive"}
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-full text-sm flex items-center gap-2"
                      onClick={() =>
                        showConfirm({
                          title: "Remove room",
                          message: `Remove ${r.roomName}? Choose whether to also delete its sensor data and related alerts. This cannot be undone.`,
                          onConfirm: removeRoom(r.nodeId),
                          showDeleteOption: true,
                        })
                      }
                    >
                      <FaTrash className="w-4 h-4 text-white" />
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Confirmation Modal */}
      {confirm.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-4">
            <h3 id="confirm-title" className="text-lg font-semibold mb-2">
              {confirm.title}
            </h3>
            <p className="text-sm text-gray-700 mb-4">{confirm.message}</p>
            <div className="mb-4">
              {confirm.showDeleteOption && (
                <label className="flex items-center gap-2 mb-2 text-sm">
                  <input
                    type="checkbox"
                    checked={confirm.deleteOption}
                    onChange={() =>
                      setConfirm((prev) => ({
                        ...prev,
                        deleteOption: !prev.deleteOption,
                      }))
                    }
                    className="w-4 h-4"
                  />
                  <span>Also delete sensor data and related alerts</span>
                </label>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded border"
                onClick={() =>
                  setConfirm({
                    open: false,
                    title: "",
                    message: "",
                    onConfirm: null,
                  })
                }
                disabled={processing}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={handleConfirm}
                disabled={processing}
              >
                {processing ? "Please wait..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
