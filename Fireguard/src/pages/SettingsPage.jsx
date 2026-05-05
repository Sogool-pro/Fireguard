import React, { useState, useEffect, useRef } from "react";
import { useRoom } from "../context/RoomContext";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import {
  FaHome,
  FaEdit,
  FaArchive,
  FaTrash,
  FaPhone,
  FaPlus,
  FaDatabase,
  FaDownload,
  FaUpload,
  FaExclamationTriangle,
  FaLock,
  FaThermometerHalf,
  FaSmog,
  FaWind,
  FaTint,
} from "react-icons/fa";
import { db } from "../firebase";
import { ref, set, remove, onValue, get } from "firebase/database";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useToast } from "../context/ToastContext";
import { useThresholds } from "../context/ThresholdContext";
import {
  DEFAULT_SENSOR_THRESHOLDS,
  SENSOR_THRESHOLD_DEFINITIONS,
  SENSOR_THRESHOLD_ORDER,
  formatThresholdNumber,
  normalizeThresholds,
} from "../utils/sensorThresholds";
import {
  createSystemBackup,
  downloadBackupFile,
  readBackupFile,
  restoreSystemBackup,
} from "../services/backupRestore";

const THRESHOLD_ICONS = {
  temperature: FaThermometerHalf,
  gas: FaSmog,
  co: FaWind,
  humidity: FaTint,
};

const SETTINGS_SECTIONS = [
  { id: "backup", label: "Backup & Restore" },
  { id: "thresholds", label: "Thresholds" },
  { id: "rooms", label: "Rooms & Nodes" },
  { id: "contacts", label: "Emergency Contacts" },
];

const SETTINGS_SECTION_BUTTON_STYLE = {
  fontSize: "var(--fg-text-detail)",
};

const THRESHOLD_READONLY_INPUT_STYLE = {
  background: "#f6f4f1",
};

const THRESHOLD_MUTED_READONLY_INPUT_STYLE = {
  background: "#f6f4f1",
  color: "#64748b",
};

function buildThresholdForm(thresholds) {
  const normalized = normalizeThresholds(thresholds);

  return SENSOR_THRESHOLD_ORDER.reduce((form, sensorKey) => {
    form[sensorKey] = {
      warning: formatThresholdNumber(sensorKey, normalized[sensorKey].warning),
      warningMax: formatThresholdNumber(
        sensorKey,
        normalized[sensorKey].warningMax,
      ),
      alert: getAlertFromWarningMax(
        sensorKey,
        normalized[sensorKey].warningMax,
      ),
    };
    return form;
  }, {});
}

function getSensorUnitLabel(sensorKey) {
  const unit = SENSOR_THRESHOLD_DEFINITIONS[sensorKey].unit;
  return unit === "C" ? "°C" : unit;
}

function getAlertFromWarningMax(sensorKey, value) {
  if (value === "") return "";

  const warningMax = Number(value);
  if (!Number.isFinite(warningMax)) return value;

  return formatThresholdNumber(sensorKey, warningMax);
}

function parseThresholdForm(form) {
  return SENSOR_THRESHOLD_ORDER.reduce((thresholds, sensorKey) => {
    const meta = SENSOR_THRESHOLD_DEFINITIONS[sensorKey];
    const warning = Number(form[sensorKey]?.warning);
    const warningMax = Number(form[sensorKey]?.warningMax);
    const alert = Number(
      getAlertFromWarningMax(sensorKey, form[sensorKey]?.warningMax ?? ""),
    );

    if (
      !Number.isFinite(warning) ||
      !Number.isFinite(warningMax) ||
      !Number.isFinite(alert)
    ) {
      throw new Error(`${meta.label} thresholds must be valid numbers.`);
    }

    if (warning < 0 || warningMax < 0 || alert < 0) {
      throw new Error(`${meta.label} thresholds cannot be negative.`);
    }

    if (warning >= warningMax) {
      throw new Error(
        `${meta.label} warning minimum must be lower than its warning maximum.`,
      );
    }

    if (warningMax > alert) {
      throw new Error(
        `${meta.label} warning maximum must not be higher than its alert threshold.`,
      );
    }

    thresholds[sensorKey] = { warning, warningMax, alert };
    return thresholds;
  }, {});
}

export default function SettingsPage() {
  const { rooms, setRooms } = useRoom();
  const { showToast } = useToast();
  const {
    thresholds,
    loading: thresholdsLoading,
    error: thresholdsLoadError,
    saveThresholds,
  } = useThresholds();
  const backupFileInputRef = useRef(null);
  const [userRole, setUserRole] = useState(null);
  const [backupBusy, setBackupBusy] = useState(false);
  const [restoreBusy, setRestoreBusy] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] =
    useState("thresholds");
  const [thresholdForm, setThresholdForm] = useState(() =>
    buildThresholdForm(DEFAULT_SENSOR_THRESHOLDS),
  );
  const [thresholdDirty, setThresholdDirty] = useState(false);
  const [thresholdSaving, setThresholdSaving] = useState(false);
  const [thresholdError, setThresholdError] = useState("");
  const [passwordGate, setPasswordGate] = useState({
    open: false,
    title: "",
    message: "",
    password: "",
    error: "",
    submitting: false,
    onVerified: null,
  });

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

  useEffect(() => {
    if (!thresholdDirty) {
      setThresholdForm(buildThresholdForm(thresholds));
    }
  }, [thresholdDirty, thresholds]);

  const updateThresholdField = (sensorKey, field, value) => {
    setThresholdDirty(true);
    setThresholdError("");
    setThresholdForm((prev) => ({
      ...prev,
      [sensorKey]: {
        ...prev[sensorKey],
        [field]: value,
      },
    }));
  };

  const updateWarningMaxField = (sensorKey, value) => {
    setThresholdDirty(true);
    setThresholdError("");
    setThresholdForm((prev) => ({
      ...prev,
      [sensorKey]: {
        ...prev[sensorKey],
        warningMax: value,
        alert: getAlertFromWarningMax(sensorKey, value),
      },
    }));
  };

  const resetThresholdForm = () => {
    setThresholdDirty(true);
    setThresholdError("");
    setThresholdForm(buildThresholdForm(DEFAULT_SENSOR_THRESHOLDS));
  };

  const saveThresholdSettings = async () => {
    try {
      const parsedThresholds = parseThresholdForm(thresholdForm);
      setThresholdSaving(true);
      setThresholdError("");

      await saveThresholds(parsedThresholds);
      setThresholdDirty(false);
      setThresholdForm(buildThresholdForm(parsedThresholds));
      showToast(
        {
          title: "Thresholds saved",
          description: "Sensor configuration updated successfully.",
        },
        "success",
        { duration: 5000 },
      );
    } catch (err) {
      console.error("Failed to save thresholds:", err);
      const message = err.message || "Failed to save sensor thresholds.";
      setThresholdError(message);
      showToast(message, "error");
    } finally {
      setThresholdSaving(false);
    }
  };

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

  const closePasswordGate = () => {
    setPasswordGate({
      open: false,
      title: "",
      message: "",
      password: "",
      error: "",
      submitting: false,
      onVerified: null,
    });
  };

  const requestPasswordVerification = ({ title, message, onVerified }) => {
    setPasswordGate({
      open: true,
      title,
      message,
      password: "",
      error: "",
      submitting: false,
      onVerified,
    });
  };

  const verifyCurrentPassword = async (password) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("You must be signed in to continue.");
    }

    if (!currentUser.email) {
      throw new Error("This account does not support password verification.");
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password,
    );
    await reauthenticateWithCredential(currentUser, credential);
  };

  const getPasswordVerificationError = (err) => {
    switch (err.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "The password you entered is incorrect.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error while verifying your password.";
      default:
        return err.message || "Failed to verify password.";
    }
  };

  const handlePasswordGateSubmit = async (event) => {
    event.preventDefault();

    if (!passwordGate.password.trim()) {
      setPasswordGate((prev) => ({
        ...prev,
        error: "Enter your password to continue.",
      }));
      return;
    }

    try {
      setPasswordGate((prev) => ({
        ...prev,
        error: "",
        submitting: true,
      }));

      await verifyCurrentPassword(passwordGate.password);
      const nextAction = passwordGate.onVerified;
      closePasswordGate();

      if (nextAction) {
        await nextAction();
      }
    } catch (err) {
      console.error("Password verification failed:", err);
      setPasswordGate((prev) => ({
        ...prev,
        error: getPasswordVerificationError(err),
        submitting: false,
      }));
    }
  };

  const executeDownloadBackup = async () => {
    try {
      setBackupBusy(true);
      const backup = await createSystemBackup(auth.currentUser);
      downloadBackupFile(backup);
      showToast(
        `Backup downloaded (${backup.summary.realtimeRootKeys} data groups, ${backup.summary.users} users).`,
        "success",
      );
    } catch (err) {
      console.error("Failed to create backup:", err);
      showToast(`Failed to create backup: ${err.message}`, "error");
    } finally {
      setBackupBusy(false);
    }
  };

  const handleDownloadBackup = () => {
    requestPasswordVerification({
      title: "Download backup",
      message:
        "Enter your account password before exporting system backup data.",
      onVerified: executeDownloadBackup,
    });
  };

  const executeRestoreBackup = async (backup) => {
    try {
      setRestoreBusy(true);
      const summary = await restoreSystemBackup(backup);
      const userMessage =
        summary.users > 0
          ? `${summary.users} user record${summary.users === 1 ? "" : "s"}`
          : "Firestore users unchanged";

      showToast(
        `Backup restored (${summary.realtimeRootKeys} data groups, ${userMessage}).`,
        "success",
      );
    } catch (err) {
      console.error("Failed to restore backup:", err);
      showToast(`Failed to restore backup: ${err.message}`, "error");
    } finally {
      setRestoreBusy(false);
    }
  };

  const requestRestorePassword = (backup) => {
    requestPasswordVerification({
      title: "Restore backup",
      message: "Enter your account password before replacing live system data.",
      onVerified: () => executeRestoreBackup(backup),
    });
  };

  const handleRestoreFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      const backup = await readBackupFile(file);
      const userMessage =
        backup.summary.users > 0
          ? `${backup.summary.users} Firestore user record${
              backup.summary.users === 1 ? "" : "s"
            }`
          : "no Firestore user records";
      const realtimeMessage = `${backup.summary.realtimeRootKeys} Realtime Database data group${
        backup.summary.realtimeRootKeys === 1 ? "" : "s"
      }`;

      showConfirm({
        title: "Restore backup",
        message: `Restore ${file.name}? This will replace current Realtime Database data with ${realtimeMessage}. The file contains ${userMessage}.${
          backup.summary.realtimeOnly
            ? " Firestore users will be left unchanged because this is an RTDB-only export."
            : " Firebase Auth accounts and passwords are not changed."
        }`,
        onConfirm: () => requestRestorePassword(backup),
      });
    } catch (err) {
      console.error("Failed to read backup file:", err);
      showToast(`Failed to read backup file: ${err.message}`, "error");
    }
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
        ? "bg-green-50 text-green-700"
        : "bg-slate-100 text-slate-500",
      dot: isOnline ? "bg-green-600" : "bg-slate-400",
      iconWrap: isOnline
        ? "bg-green-50 text-green-700"
        : "bg-slate-100 text-slate-500",
    };
  };

  const getPhoneBadge = (phone) => {
    const value = `${phone.label} ${phone.number}`.toLowerCase();
    if (value.includes("landline")) return "LANDLINE";
    if (value.includes("smart")) return "SMART";
    if (value.includes("admin") || value.includes("primary")) return "PRIMARY";
    return null;
  };

  const thresholdStatusMessage =
    thresholdError ||
    (thresholdsLoadError
      ? "Unable to load saved thresholds. Defaults are shown."
      : "");
  const selectedSettingsSection = SETTINGS_SECTIONS.some(
    (section) => section.id === activeSettingsSection,
  )
    ? activeSettingsSection
    : "thresholds";

  return (
    <div className="fg-page">
      <h1 className="mb-4 text-base font-semibold tracking-[-0.02em] text-slate-950">
        System Settings
      </h1>

      {userRole === "admin" && (
        <>
          <div className="grid gap-4 lg:grid-cols-[190px_minmax(0,1fr)]">
            <aside
              className="h-fit rounded-[11px] border border-[#e2ddd8] bg-white p-2 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
              aria-label="Settings sections"
            >
              {SETTINGS_SECTIONS.map((item) => {
                const active = selectedSettingsSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSettingsSection(item.id)}
                    style={SETTINGS_SECTION_BUTTON_STYLE}
                    className={`mb-px block w-full rounded-[7px] px-2.5 py-2 text-left text-detail transition ${
                      active
                        ? "bg-red-50 font-medium text-red-600"
                        : "font-normal text-slate-600 hover:bg-[#f6f4f1] hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </aside>

            <div className="min-w-0">
              {selectedSettingsSection === "thresholds" && (
                <section className="rounded-[11px] border border-[#e2ddd8] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                  <div>
                    <h2 className="text-sm font-semibold leading-tight tracking-[-0.015em] text-slate-950">
                      Sensor Thresholds
                    </h2>
                    <p className="mt-1 text-label leading-4 text-slate-500">
                      Define warning and alert levels for each sensor type
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2.5 xl:grid-cols-2">
                    {SENSOR_THRESHOLD_ORDER.map((sensorKey) => {
                      const meta = SENSOR_THRESHOLD_DEFINITIONS[sensorKey];
                      const Icon = THRESHOLD_ICONS[sensorKey];
                      const unitLabel = getSensorUnitLabel(sensorKey);

                      return (
                        <div
                          key={sensorKey}
                          className="rounded-[9px] border border-[#e2ddd8] bg-[#f6f4f1] p-3"
                        >
                          <div className="mb-2.5 flex items-center gap-1.5 text-label font-medium text-slate-950">
                            <Icon
                              className={`text-micro ${
                                sensorKey === "temperature"
                                  ? "text-fuchsia-500"
                                  : sensorKey === "humidity"
                                    ? "text-sky-500"
                                    : "text-violet-300"
                              }`}
                            />
                            <span>
                              {meta.label} ({unitLabel})
                            </span>
                          </div>

                          <div className="grid gap-x-2 gap-y-2 sm:grid-cols-2">
                            <label className="block">
                              <span className="mb-1 block font-mono text-micro uppercase tracking-[0.06em] text-slate-400">
                                Warning Min
                              </span>
                              <input
                                type="number"
                                min="0"
                                step={meta.precision > 0 ? "0.1" : "1"}
                                value={thresholdForm[sensorKey]?.warning ?? ""}
                                onChange={(event) =>
                                  updateThresholdField(
                                    sensorKey,
                                    "warning",
                                    event.target.value,
                                  )
                                }
                                className="fg-input"
                                aria-label={`${meta.label} warning minimum`}
                              />
                            </label>

                            <label className="block">
                              <span className="mb-1 block font-mono text-micro uppercase tracking-[0.06em] text-slate-400">
                                Warning Max
                              </span>
                              <input
                                type="number"
                                min="0"
                                step={meta.precision > 0 ? "0.1" : "1"}
                                value={
                                  thresholdForm[sensorKey]?.warningMax ?? ""
                                }
                                onChange={(event) =>
                                  updateWarningMaxField(
                                    sensorKey,
                                    event.target.value,
                                  )
                                }
                                className="fg-input"
                                aria-label={`${meta.label} warning maximum`}
                              />
                            </label>

                            <label className="block">
                              <span className="mb-1 block font-mono text-micro uppercase tracking-[0.06em] text-slate-400">
                                Alert Above
                              </span>
                              <input
                                type="number"
                                min="0"
                                step={meta.precision > 0 ? "0.1" : "1"}
                                readOnly
                                value={thresholdForm[sensorKey]?.alert ?? ""}
                                style={THRESHOLD_MUTED_READONLY_INPUT_STYLE}
                                className="fg-input"
                                aria-label={`${meta.label} alert threshold`}
                              />
                            </label>

                            <label className="block">
                              <span className="mb-1 block font-mono text-micro uppercase tracking-[0.06em] text-slate-400">
                                Unit
                              </span>
                              <input
                                type="text"
                                readOnly
                                value={unitLabel}
                                style={THRESHOLD_READONLY_INPUT_STYLE}
                                className="fg-input"
                                aria-label={`${meta.label} unit`}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {thresholdStatusMessage && (
                    <div className="mt-3 rounded-[7px] border border-red-100 bg-red-50 px-3 py-2 text-label font-medium text-red-700">
                      {thresholdStatusMessage}
                    </div>
                  )}

                  <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      className="fg-btn"
                      onClick={resetThresholdForm}
                      disabled={thresholdSaving}
                    >
                      Reset Defaults
                    </button>
                    <button
                      type="button"
                      className="fg-btn fg-btn-primary"
                      onClick={saveThresholdSettings}
                      disabled={thresholdSaving || thresholdsLoading}
                    >
                      {thresholdSaving ? "Saving..." : "Save Thresholds"}
                    </button>
                  </div>
                </section>
              )}

              {selectedSettingsSection === "backup" && (
                <div className="space-y-4">
                  <div className="control-strip">
                    <div className="control-tile">
                      <div className="control-label">Installed Rooms</div>
                      <div className="control-value">{rooms.length}</div>
                      <div className="control-sub">
                        Auto-registered sensor nodes
                      </div>
                    </div>
                    <div className="control-tile">
                      <div className="control-label">Emergency Contacts</div>
                      <div className="control-value">{phoneNumbers.length}</div>
                      <div className="control-sub">
                        SMS and response numbers
                      </div>
                    </div>
                    <div className="control-tile">
                      <div className="control-label">Backup Status</div>
                      <div className="control-value">
                        <span className="h-2 w-2 rounded-full bg-[#16803c]" />
                        Ready
                      </div>
                      <div className="control-sub">
                        Password verification enabled
                      </div>
                    </div>
                  </div>

                  <section className="settings-card-v2">
                    <div className="fg-card-head">
                      <div className="flex items-start gap-4">
                        <div className="fg-icon-box">
                          <FaDatabase className="text-lg" />
                        </div>
                        <div>
                          <h3 className="fg-card-title ">Backup & Restore</h3>
                          <p className="fg-card-sub">
                            Export or restore system database records.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
                      <div className="flex flex-col justify-between gap-4 p-4">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
                            Download Backup
                          </h4>
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            Includes Realtime Database data and Firestore user
                            records.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleDownloadBackup}
                          disabled={backupBusy || restoreBusy}
                          className="fg-btn fg-btn-dark w-full sm:w-fit"
                        >
                          <FaDownload className="text-sm" />
                          {backupBusy ? "Preparing..." : "Download Backup"}
                        </button>
                      </div>

                      <div className="flex flex-col justify-between gap-4 p-4">
                        <input
                          ref={backupFileInputRef}
                          type="file"
                          accept=".json,application/json"
                          className="hidden"
                          onChange={handleRestoreFileChange}
                        />

                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
                            Restore Backup
                          </h4>
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            Imports a FireGuard JSON backup file.
                          </p>
                          <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                            <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                            <span>
                              Restore replaces live database values. Firebase
                              Auth accounts and passwords are not changed.
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => backupFileInputRef.current?.click()}
                          disabled={backupBusy || restoreBusy}
                          className="fg-btn fg-btn-primary w-full sm:w-fit"
                        >
                          <FaUpload className="text-sm" />
                          {restoreBusy ? "Restoring..." : "Choose Backup File"}
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {selectedSettingsSection === "rooms" && (
                <section className="settings-card-v2">
                  <div className="fg-card-head">
                    <div className="flex items-start gap-4">
                      <div className="fg-icon-box">
                        <FaHome className="text-lg" />
                      </div>
                      <div>
                        <h3 className="fg-card-title">Room Management</h3>
                        <p className="fg-card-sub">
                          Configure and manage your monitored rooms
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="fg-card-body space-y-3">
                    {rooms.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-xs text-slate-500">
                        No rooms found.
                      </div>
                    )}

                    {rooms.map((r, idx) => {
                      const statusMeta = getRoomStatusMeta(r);

                      return (
                        <div
                          key={r.nodeId || idx}
                          className="rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex min-w-0 items-center gap-3">
                              <div
                                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] ${statusMeta.iconWrap}`}
                              >
                                <FaHome className="text-base" />
                              </div>

                              <div className="min-w-0 flex-1">
                                {editingMap[r.nodeId] ? (
                                  <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-tight text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                                    value={edited[r.nodeId] ?? r.roomName}
                                    onChange={(e) =>
                                      setEdited((s) => ({
                                        ...s,
                                        [r.nodeId]: e.target.value,
                                      }))
                                    }
                                  />
                                ) : (
                                  <div className="truncate text-xs font-semibold uppercase tracking-tight text-slate-950">
                                    {r.roomName}
                                  </div>
                                )}

                                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                                  <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-micro font-semibold uppercase tracking-[0.14em] ${statusMeta.tone}`}
                                  >
                                    <span
                                      className={`h-2 w-2 rounded-full ${statusMeta.dot}`}
                                    />
                                    {statusMeta.label}
                                  </span>
                                  <span className="text-label text-slate-500">
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
                                    className="rounded-lg bg-slate-950 px-3 py-2 text-label font-semibold text-white transition hover:bg-slate-800"
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
                                    className="rounded-lg border border-slate-200 px-3 py-2 text-label font-semibold text-slate-600 transition hover:bg-slate-50"
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
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
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
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                                    onClick={() =>
                                      showConfirm({
                                        title: r.archived
                                          ? "Unarchive room"
                                          : "Archive room",
                                        message: r.archived
                                          ? `Unarchive ${r.roomName}? It will reappear on the dashboard.`
                                          : `Archive ${r.roomName}? It will be hidden from the dashboard but not deleted.`,
                                        onConfirm: () =>
                                          toggleArchive(r.nodeId),
                                      })
                                    }
                                    aria-label={`${r.archived ? "Unarchive" : "Archive"} ${r.roomName}`}
                                  >
                                    <FaArchive className="text-xs" />
                                  </button>
                                  <button
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
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
              )}

              {selectedSettingsSection === "contacts" && (
                <section className="settings-card-v2">
                  <div className="fg-card-head">
                    <div className="flex items-start gap-4">
                      <div className="fg-icon-box red">
                        <FaPhone className="text-lg" />
                      </div>
                      <div>
                        <h3 className="fg-card-title">Emergency Contacts</h3>
                        <p className="fg-card-sub">
                          Manage SMS notifications and emergency hotlines
                        </p>
                      </div>
                    </div>

                    <button
                      className="fg-btn fg-btn-primary"
                      onClick={openAddPhoneModal}
                    >
                      <FaPlus className="text-sm" />
                      Add Number
                    </button>
                  </div>

                  <div className="fg-card-body space-y-3">
                    {phoneNumbers.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-xs text-slate-500">
                        No phone numbers found.
                      </div>
                    )}

                    {phoneNumbers.map((phone) => (
                      <div
                        key={phone.id}
                        className="rounded-[18px] border border-slate-200 bg-white px-3 py-3 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] bg-red-50 text-red-500">
                              <FaPhone className="text-sm" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <div className="truncate text-xs font-semibold tracking-tight text-slate-950">
                                  {phone.label}
                                </div>
                                {getPhoneBadge(phone) && (
                                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-micro font-semibold tracking-[0.14em] text-slate-500">
                                    {getPhoneBadge(phone)}
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 text-label font-medium text-slate-600">
                                {phone.number}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                              onClick={() => openEditPhoneModal(phone)}
                              aria-label={`Edit ${phone.label}`}
                            >
                              <FaEdit className="text-xs" />
                            </button>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
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
              )}
            </div>
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

          {passwordGate.open && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="password-gate-title"
            >
              <form
                className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.24)]"
                onSubmit={handlePasswordGateSubmit}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <FaLock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3
                      id="password-gate-title"
                      className="text-xl font-black uppercase tracking-tight text-slate-950"
                    >
                      {passwordGate.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {passwordGate.message}
                    </p>
                  </div>
                </div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  value={passwordGate.password}
                  onChange={(event) =>
                    setPasswordGate((prev) => ({
                      ...prev,
                      password: event.target.value,
                      error: "",
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                />

                {passwordGate.error && (
                  <p className="mt-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {passwordGate.error}
                  </p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                    onClick={closePasswordGate}
                    disabled={passwordGate.submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                    disabled={passwordGate.submitting}
                  >
                    {passwordGate.submitting ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>
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
