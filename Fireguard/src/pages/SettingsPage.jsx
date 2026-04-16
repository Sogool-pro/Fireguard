import React, { useState, useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { auth, firestore } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { FaHome, FaEdit, FaArchive, FaTrash, FaPhone, FaPlus } from "react-icons/fa";
import { db } from "../firebase";
import { ref, set, remove, onValue, get } from "firebase/database";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function SettingsPage() {
  const { rooms, setRooms } = useRoom();
  const [userRole, setUserRole] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [loadingName, setLoadingName] = useState(false);

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
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isPasswordChangeRequired, setIsPasswordChangeRequired] =
    useState(false);
  const [tempPasswordFromLogin, setTempPasswordFromLogin] = useState("");

  // Phone numbers state
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneModal, setPhoneModal] = useState({
    open: false,
    mode: "add", // "add" or "edit"
    id: null,
    label: "",
    number: "",
  });

  // Get user role from Firestore
  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(
          doc(firestore, "users", auth.currentUser.uid),
        );
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
          setDisplayName(
            userDoc.data().displayName || auth.currentUser.displayName || "",
          );

          // Check if user needs to change password (temporary password setup)
          if (userDoc.data().needsPasswordChange) {
            // Retrieve the temporary password from sessionStorage
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
      alert("Name cannot be empty");
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
        await updateDoc(doc(firestore, "users", auth.currentUser.uid), {
          displayName: displayName,
        });
      }
      setEditingName(false);
      alert("Name updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update name: " + err.message);
    } finally {
      setLoadingName(false);
    }
  };

  useEffect(() => {
    const map = {};
    rooms.forEach((r) => {
      if (r.nodeId) map[r.nodeId] = r.roomName;
    });
    setEdited((prev) => {
      // Preserve existing edited values, only update for new rooms
      const updated = { ...prev };
      rooms.forEach((r) => {
        if (r.nodeId && !(r.nodeId in updated)) {
          updated[r.nodeId] = r.roomName;
        }
      });
      return updated;
    });
    // Preserve editing states - only reset for rooms that no longer exist
    setEditingMap((prev) => {
      const updated = { ...prev };
      const currentRoomIds = new Set(
        rooms.map((r) => r.nodeId).filter(Boolean),
      );
      // Remove editing state for rooms that no longer exist
      Object.keys(updated).forEach((nodeId) => {
        if (!currentRoomIds.has(nodeId)) {
          delete updated[nodeId];
        }
      });
      // Add false for new rooms that don't have editing state yet
      rooms.forEach((r) => {
        if (r.nodeId && !(r.nodeId in updated)) {
          updated[r.nodeId] = false;
        }
      });
      return updated;
    });
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
      },
    );
    return () => unsubscribe();
  }, []);

  const saveName = async (nodeId) => {
    const name = edited[nodeId] ?? "";
    try {
      await set(ref(db, `room_names/${nodeId}`), name);
      setRooms((prev) =>
        prev.map((r) =>
          r.nodeId === nodeId ? { ...r, roomName: name, customName: name } : r,
        ),
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
              r.nodeId === nodeId ? { ...r, archived: true } : r,
            ),
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
        prev.map((r) => (r.nodeId === nodeId ? { ...r, archived: next } : r)),
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
        prev.map((r) => (r.nodeId === nodeId ? { ...r, onRepair: next } : r)),
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

  const getRoomStatusMeta = (room) => {
    if (room.archived) {
      return {
        label: "Archived",
        tone: "bg-slate-100 text-slate-500",
        dot: "bg-slate-400",
        iconWrap: "bg-slate-100 text-slate-400",
      };
    }

    const isOnline = room.status === "Active";
    return {
      label: isOnline ? "Online" : "Offline",
      tone: isOnline
        ? "bg-indigo-50 text-indigo-600"
        : "bg-slate-100 text-slate-500",
      dot: isOnline ? "bg-indigo-500" : "bg-slate-400",
      iconWrap: isOnline
        ? "bg-indigo-50 text-indigo-600"
        : "bg-slate-100 text-slate-500",
    };
  };

  const getPhoneBadge = (phone) => {
    const value = `${phone.label} ${phone.number}`.toLowerCase();
    if (value.includes("landline")) return "LANDLINE";
    if (value.includes("smart")) return "SMART";
    if (value.includes("admin") || value.includes("primary")) return "PRIMARY";
    return "CONTACT";
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold uppercase tracking-tight text-slate-950">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage room setup and emergency contacts.
        </p>
      </div>

      {/* Admin Only Section - Room Management */}
      {userRole === "admin" && (
        <>
          <div className="grid gap-8 xl:grid-cols-2">
            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-white shadow-sm">
                    <FaHome className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-tight text-slate-950">
                      Room Management
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Configure and manage your monitored rooms
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                {rooms.length === 0 && (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                    No rooms found.
                  </div>
                )}

                {rooms.map((r, idx) => {
                  const statusMeta = getRoomStatusMeta(r);

                  return (
                    <div
                      key={r.nodeId || idx}
                      className="rounded-[26px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[18px] ${statusMeta.iconWrap}`}
                          >
                            <FaHome className="text-xl" />
                          </div>

                          <div className="min-w-0 flex-1">
                            {editingMap[r.nodeId] ? (
                              <input
                                type="text"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base font-semibold uppercase tracking-tight text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                                value={edited[r.nodeId] ?? r.roomName}
                                onChange={(e) =>
                                  setEdited((s) => ({
                                    ...s,
                                    [r.nodeId]: e.target.value,
                                  }))
                                }
                              />
                            ) : (
                              <div className="truncate text-base font-semibold uppercase tracking-tight text-slate-950">
                                {r.roomName}
                              </div>
                            )}

                            <div className="mt-1.5 flex flex-wrap items-center gap-3">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${statusMeta.tone}`}
                              >
                                <span
                                  className={`h-2 w-2 rounded-full ${statusMeta.dot}`}
                                />
                                {statusMeta.label}
                              </span>
                              <span className="text-xs text-slate-500">
                                Node ID:{" "}
                                <span className="font-medium text-slate-700">
                                  {r.nodeId || "unknown"}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {editingMap[r.nodeId] ? (
                            <>
                              <button
                                className="rounded-xl bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                                onClick={async () => {
                                  await saveName(r.nodeId);
                                  setEditingMap((s) => ({
                                    ...s,
                                    [r.nodeId]: false,
                                  }));
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                                onClick={() => {
                                  setEdited((s) => ({
                                    ...s,
                                    [r.nodeId]: r.roomName,
                                  }));
                                  setEditingMap((s) => ({
                                    ...s,
                                    [r.nodeId]: false,
                                  }));
                                }}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                                onClick={() =>
                                  setEditingMap((s) => ({
                                    ...s,
                                    [r.nodeId]: true,
                                  }))
                                }
                                aria-label={`Edit ${r.roomName}`}
                              >
                                <FaEdit className="text-xs" />
                              </button>
                              <button
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                                onClick={() =>
                                  showConfirm({
                                    title: r.archived
                                      ? "Unarchive room"
                                      : "Archive room",
                                    message: r.archived
                                      ? `Unarchive ${r.roomName}? It will reappear on the dashboard.`
                                      : `Archive ${r.roomName}? It will be hidden from the dashboard but not deleted.`,
                                    onConfirm: () => toggleArchive(r.nodeId),
                                  })
                                }
                                aria-label={`${r.archived ? "Unarchive" : "Archive"} ${r.roomName}`}
                              >
                                <FaArchive className="text-xs" />
                              </button>
                              <button
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                                onClick={() =>
                                  showConfirm({
                                    title: "Remove room",
                                    message: `Remove ${r.roomName}? Choose whether to also delete its sensor data and related alerts. This cannot be undone.`,
                                    onConfirm: removeRoom(r.nodeId),
                                    showDeleteOption: true,
                                  })
                                }
                                aria-label={`Delete ${r.roomName}`}
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white shadow-sm">
                    <FaPhone className="text-lg" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-tight text-slate-950">
                      Emergency Contacts
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Manage SMS notifications and emergency hotlines
                    </p>
                  </div>
                </div>

                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                  onClick={openAddPhoneModal}
                >
                  <FaPlus className="text-sm" />
                  Add Number
                </button>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                {phoneNumbers.length === 0 && (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                    No phone numbers found.
                  </div>
                )}

                {phoneNumbers.map((phone) => (
                  <div
                    key={phone.id}
                    className="rounded-[26px] border border-slate-200 bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[18px] bg-red-50 text-red-500">
                          <FaPhone className="text-base" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="truncate text-[15px] font-semibold tracking-tight text-slate-950">
                              {phone.label}
                            </div>
                            <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold tracking-[0.16em] text-slate-500">
                              {getPhoneBadge(phone)}
                            </span>
                          </div>
                          <div className="mt-1 text-xs font-medium text-slate-600">
                            {phone.number}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                          onClick={() => openEditPhoneModal(phone)}
                          aria-label={`Edit ${phone.label}`}
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <button
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                          onClick={() => deletePhoneNumber(phone.id)}
                          aria-label={`Delete ${phone.label}`}
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Phone Number Modal */}
          {phoneModal.open && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="phone-modal-title"
            >
              <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.22)]">
                <h3
                  id="phone-modal-title"
                  className="mb-4 text-xl font-black uppercase tracking-tight text-slate-950"
                >
                  {phoneModal.mode === "add"
                    ? "Add Phone Number"
                    : "Edit Phone Number"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-600">
                      Label
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-red-300 focus:bg-white"
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
                    <label className="mb-1 block text-sm font-semibold text-slate-600">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-red-300 focus:bg-white"
                      placeholder="e.g., +639456789012"
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
                    className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    onClick={closePhoneModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
            >
              <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.22)]">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                      confirm.showDeleteOption ? "bg-red-100" : "bg-slate-900"
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
                      className="text-xl font-black uppercase tracking-tight text-slate-950"
                    >
                      {confirm.title}
                    </h3>
                  </div>
                </div>

                {/* Message */}
                <p className="mb-6 text-sm leading-6 text-slate-600">
                  {confirm.message}
                </p>

                {/* Delete Option Checkbox */}
                {confirm.showDeleteOption && (
                  <div className="mb-6">
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <input
                        type="checkbox"
                        checked={confirm.deleteOption}
                        onChange={() =>
                          setConfirm((prev) => ({
                            ...prev,
                            deleteOption: !prev.deleteOption,
                          }))
                        }
                        className="h-5 w-5 cursor-pointer accent-red-600"
                      />
                      <span className="text-sm font-medium text-slate-900">
                        Also delete sensor data and related alerts
                      </span>
                    </label>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button
                    className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
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
                    className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    onClick={handleConfirm}
                    disabled={processing}
                  >
                    {processing ? "Please wait..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => {
          if (!isPasswordChangeRequired) {
            setShowChangePasswordModal(false);
          }
        }}
        onSuccess={() => {
          // After successful password change, close modal and optionally redirect
          if (isPasswordChangeRequired) {
            setShowChangePasswordModal(false);
            setIsPasswordChangeRequired(false);
            // Clear the temporary password from sessionStorage
            sessionStorage.removeItem("tempPassword");
          }
        }}
        isRequired={isPasswordChangeRequired}
        currentPassword={tempPasswordFromLogin}
      />
    </div>
  );
}
