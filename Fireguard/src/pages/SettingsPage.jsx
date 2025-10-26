import React, { useState, useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { db } from "../firebase";
import { ref, set, remove } from "firebase/database";

export default function SettingsPage() {
  const { rooms, setRooms } = useRoom();

  // local edited names map
  const [edited, setEdited] = useState({});
  // confirmation modal state
  const [confirm, setConfirm] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const map = {};
    rooms.forEach((r) => {
      if (r.nodeId) map[r.nodeId] = r.roomName;
    });
    setEdited(map);
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

  const removeRoom = async (nodeId) => {
    try {
      await remove(ref(db, `sensor_data/${nodeId}`));
      await remove(ref(db, `room_names/${nodeId}`));
      setRooms((prev) => prev.filter((r) => r.nodeId !== nodeId));
    } catch (err) {
      console.error("Failed to remove room:", err);
      alert("Failed to remove room");
    }
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
  const showConfirm = ({ title, message, onConfirm }) => {
    setConfirm({ open: true, title, message, onConfirm });
  };

  const handleConfirm = async () => {
    if (!confirm.onConfirm) {
      setConfirm({ open: false, title: "", message: "", onConfirm: null });
      return;
    }
    try {
      setProcessing(true);
      await confirm.onConfirm();
    } catch (err) {
      console.error("Action failed:", err);
      // swallow; action functions already alert on failure
    } finally {
      setProcessing(false);
      setConfirm({ open: false, title: "", message: "", onConfirm: null });
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Rooms</h2>
      <div className="space-y-3">
        {rooms.length === 0 && (
          <p className="text-sm text-gray-500">No rooms found.</p>
        )}
        {rooms.map((r, idx) => (
          <div
            key={r.nodeId || idx}
            className="flex flex-col md:flex-row items-start md:items-center gap-3 p-3 bg-white rounded shadow-sm overflow-hidden"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">
                {r.roomName}
              </div>
              <div className="text-xs text-gray-500">
                {r.nodeId || "unknown"}
              </div>
              <div className="mt-1 flex gap-2 flex-wrap">
                {r.archived && (
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded">
                    Archived
                  </span>
                )}
                {r.onRepair && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                    On repair
                  </span>
                )}
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch md:items-center gap-2">
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm w-full md:w-56 flex-1 min-w-0"
                value={edited[r.nodeId] ?? r.roomName}
                onChange={(e) =>
                  setEdited((s) => ({ ...s, [r.nodeId]: e.target.value }))
                }
                placeholder="Custom name"
              />

              <div className="flex gap-2 flex-wrap">
                <button
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                  onClick={() =>
                    showConfirm({
                      title: "Save room name",
                      message: `Save new name "${
                        edited[r.nodeId] ?? r.roomName
                      }" for ${r.roomName}?`,
                      onConfirm: () => saveName(r.nodeId),
                    })
                  }
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
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
                  {r.archived ? "Unarchive" : "Archive"}
                </button>
                <button
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-sm"
                  onClick={() =>
                    showConfirm({
                      title: r.onRepair
                        ? "Mark room OK"
                        : "Mark room for repair",
                      message: r.onRepair
                        ? `Mark ${r.roomName} as OK (remove repair flag)?`
                        : `Mark ${r.roomName} as on repair?`,
                      onConfirm: () => toggleRepair(r.nodeId),
                    })
                  }
                >
                  {r.onRepair ? "Mark OK" : "Mark Repair"}
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  onClick={() =>
                    showConfirm({
                      title: "Remove room",
                      message: `Remove ${r.roomName} and its sensor data? This cannot be undone.`,
                      onConfirm: () => removeRoom(r.nodeId),
                    })
                  }
                >
                  Remove
                </button>
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
