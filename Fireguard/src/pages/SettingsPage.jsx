import React, { useState, useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import {
  FaHome,
  FaEdit,
  FaArchive,
  FaTrash,
  FaPhone,
  FaPlus,
} from "react-icons/fa";
import { db } from "../firebase";
import { ref, set, remove, onValue } from "firebase/database";

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

  // Phone numbers state
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneModal, setPhoneModal] = useState({
    open: false,
    mode: "add", // "add" or "edit"
    id: null,
    label: "",
    number: "",
  });

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

  // Load phone numbers from Firebase with real-time listener
  useEffect(() => {
    const phoneNumbersRef = ref(db, "phone_numbers");
    const unsubscribe = onValue(
      phoneNumbersRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const phones = Object.entries(data).map(([id, phone]) => ({
            id,
            ...phone,
          }));
          setPhoneNumbers(phones);
        } else {
          setPhoneNumbers([]);
        }
      },
      (err) => {
        console.error("Failed to load phone numbers:", err);
        setPhoneNumbers([]);
      }
    );
    return () => unsubscribe();
  }, []);

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

  // Phone number management functions
  const openAddPhoneModal = () => {
    setPhoneModal({
      open: true,
      mode: "add",
      id: null,
      label: "",
      number: "",
    });
  };

  const openEditPhoneModal = (phone) => {
    setPhoneModal({
      open: true,
      mode: "edit",
      id: phone.id,
      label: phone.label || "",
      number: phone.number || "",
    });
  };

  const closePhoneModal = () => {
    setPhoneModal({
      open: false,
      mode: "add",
      id: null,
      label: "",
      number: "",
    });
  };

  const savePhoneNumber = async () => {
    if (!phoneModal.label.trim() || !phoneModal.number.trim()) {
      alert("Please fill in both label and phone number");
      return;
    }

    try {
      if (phoneModal.mode === "add") {
        // Generate a new ID
        const newId = `phone_${Date.now()}`;
        await set(ref(db, `phone_numbers/${newId}`), {
          label: phoneModal.label.trim(),
          number: phoneModal.number.trim(),
        });
        // Don't manually update state - the real-time listener will handle it
      } else {
        // Edit existing
        await set(ref(db, `phone_numbers/${phoneModal.id}`), {
          label: phoneModal.label.trim(),
          number: phoneModal.number.trim(),
        });
        // Don't manually update state - the real-time listener will handle it
      }
      closePhoneModal();
    } catch (err) {
      console.error("Failed to save phone number:", err);
      alert("Failed to save phone number");
    }
  };

  const deletePhoneNumber = (phoneId) => {
    showConfirm({
      title: "Delete phone number",
      message: "Are you sure you want to delete this phone number?",
      onConfirm: async () => {
        try {
          await remove(ref(db, `phone_numbers/${phoneId}`));
          setPhoneNumbers((prev) => prev.filter((p) => p.id !== phoneId));
        } catch (err) {
          console.error("Failed to delete phone number:", err);
          alert("Failed to delete phone number");
        }
      },
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
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
                      className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm cursor-pointer"
                      onClick={async () => {
                        await saveName(r.nodeId);
                        setEditingMap((s) => ({ ...s, [r.nodeId]: false }));
                      }}
                    >
                      <FaEdit className="w-4 h-4 text-white" />
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm cursor-pointer"
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
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() =>
                        setEditingMap((s) => ({ ...s, [r.nodeId]: true }))
                      }
                    >
                      <FaEdit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-slate-700 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer"
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
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 transition-colors cursor-pointer"
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

      {/* Phone Numbers Section */}
      <div className="mt-12 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Phone Numbers</h3>
            <p className="text-sm text-gray-500">
              Manage emergency and notification contacts
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors cursor-pointer"
            onClick={openAddPhoneModal}
          >
            <FaPlus className="w-4 h-4" />
            Add Phone Number
          </button>
        </div>

        <div className="space-y-4">
          {phoneNumbers.length === 0 && (
            <p className="text-sm text-gray-500">No phone numbers found.</p>
          )}
          {phoneNumbers.map((phone) => (
            <div
              key={phone.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                <div className="w-14 h-14 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-2xl text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-gray-900">
                    {phone.label}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {phone.number}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex items-center gap-3">
                <button
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openEditPhoneModal(phone)}
                >
                  <FaEdit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors cursor-pointer"
                  onClick={() => deletePhoneNumber(phone.id)}
                >
                  <FaTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone Number Modal */}
      {phoneModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="phone-modal-title"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
            <h3
              id="phone-modal-title"
              className="text-lg font-semibold text-gray-900 mb-4"
            >
              {phoneModal.mode === "add"
                ? "Add Phone Number"
                : "Edit Phone Number"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="e.g., Emergency Contact"
                  value={phoneModal.label}
                  onChange={(e) =>
                    setPhoneModal((prev) => ({
                      ...prev,
                      label: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                  placeholder="e.g., +1 (555) 123-4567"
                  value={phoneModal.number}
                  onChange={(e) =>
                    setPhoneModal((prev) => ({
                      ...prev,
                      number: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={closePhoneModal}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors cursor-pointer"
                onClick={savePhoneNumber}
              >
                {phoneModal.mode === "add" ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirm.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full mx-4 p-6">
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  confirm.showDeleteOption ? "bg-red-100" : "bg-slate-700"
                }`}
              >
                {confirm.showDeleteOption ? (
                  <FaTrash className="w-5 h-5 text-red-600" />
                ) : (
                  <FaArchive className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3
                  id="confirm-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {confirm.title}
                </h3>
              </div>
            </div>

            {/* Message */}
            <p className="text-sm text-gray-700 mb-6">{confirm.message}</p>

            {/* Delete Option Checkbox */}
            {confirm.showDeleteOption && (
              <div className="mb-6">
                <label className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirm.deleteOption}
                    onChange={() =>
                      setConfirm((prev) => ({
                        ...prev,
                        deleteOption: !prev.deleteOption,
                      }))
                    }
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Also delete sensor data and related alerts
                  </span>
                </label>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
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
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
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
