import React, { useState, useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { db } from "../firebase";
import { ref, set, remove } from "firebase/database";

export default function SettingsPage() {
  const { rooms, setRooms } = useRoom();

  // local edited names map
  const [edited, setEdited] = useState({});

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
    const ok = window.confirm(
      "Remove this room and all its sensor data? This cannot be undone."
    );
    if (!ok) return;
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
                  onClick={() => saveName(r.nodeId)}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
                  onClick={() => toggleArchive(r.nodeId)}
                >
                  {r.archived ? "Unarchive" : "Archive"}
                </button>
                <button
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-sm"
                  onClick={() => toggleRepair(r.nodeId)}
                >
                  {r.onRepair ? "Mark OK" : "Mark Repair"}
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                  onClick={() => removeRoom(r.nodeId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
