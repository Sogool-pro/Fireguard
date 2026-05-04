import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import LogsTable from "../components/LogsTable";
import { db } from "../firebase";
import { limitToLast, onValue, orderByChild, push, query, ref } from "firebase/database";
import { useRoom } from "../context/RoomContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

const MANUAL_LOG_QUEUE_KEY = "fireguard_manual_log_queue_v1";
const LIVE_LOG_LIMIT = 500;
const LIVE_LOG_FALLBACK_DELAY = 5000;
const REPORT_CHANNEL_LABELS = {
  central_hub_sms: "Central Hub SMS",
  central_hub_call: "Central Hub Call",
  manual_observation: "Manual Observation",
};

function getDefaultDateTimeLocal() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function normalizeNodeId(value) {
  const raw = (value || "").trim().toUpperCase();
  if (!raw) return "";
  if (raw.startsWith("NODE")) return raw;
  const digits = raw.replace(/\D/g, "");
  return digits ? `NODE${digits}` : raw;
}

function parseOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatTimestampForStorage(date) {
  const safeDate = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${safeDate.getFullYear()}-${pad(safeDate.getMonth() + 1)}-${pad(
    safeDate.getDate(),
  )} ${pad(safeDate.getHours())}:${pad(safeDate.getMinutes())}:${pad(
    safeDate.getSeconds(),
  )}`;
}

function loadQueuedManualLogs() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(MANUAL_LOG_QUEUE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse queued manual logs:", error);
    return [];
  }
}

function saveQueuedManualLogs(queueItems) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MANUAL_LOG_QUEUE_KEY, JSON.stringify(queueItems));
}

function formatReportChannel(channel) {
  return REPORT_CHANNEL_LABELS[channel] || "Manual Entry";
}

function formatReportedBy(alert) {
  const name = String(alert?.reported_by_name || "").trim();
  const email = String(alert?.reported_by_email || "").trim();
  const fallback = String(alert?.reported_by || "").trim();

  if (name && email && name !== email) return `${name} (${email})`;
  if (name) return name;
  if (email) return email;
  if (fallback) return fallback;

  return alert?.manualEntry ? "Unknown User" : "Central Hub";
}

function getRoomNameEntries(rooms) {
  return rooms
    .filter((room) => room.nodeId)
    .map((room) => [room.nodeId, room.roomName])
    .sort(([nodeA], [nodeB]) => String(nodeA).localeCompare(String(nodeB)));
}

function areRoomNameEntriesEqual(current, next) {
  if (current.length !== next.length) return false;
  return current.every(
    ([nodeId, roomName], index) =>
      nodeId === next[index][0] && roomName === next[index][1],
  );
}

function getRecentAlertEntries(data, limit = LIVE_LOG_LIMIT) {
  return Object.entries(data || {})
    .filter(([, alert]) => alert && alert.timestamp)
    .sort(
      ([, alertA], [, alertB]) =>
        String(alertB.timestamp).localeCompare(String(alertA.timestamp)),
    )
    .slice(0, limit);
}

const initialManualForm = {
  roomNode: "",
  customNode: "",
  message: "",
  level: "warning",
  timestamp: getDefaultDateTimeLocal(),
  temperature: "",
  humidity: "",
  smoke: "",
  carbonMonoxide: "",
  flame: "0",
  reportChannel: "central_hub_sms",
  notes: "",
};

export default function LogsPage() {
  const [rawAlerts, setRawAlerts] = useState([]);
  const [roomNameEntries, setRoomNameEntries] = useState([]);
  const { rooms } = useRoom();
  const { showToast } = useToast();
  const { user } = useAuth();

  const [showManualForm, setShowManualForm] = useState(false);
  const [manualForm, setManualForm] = useState(initialManualForm);
  const [queuedCount, setQueuedCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  useEffect(() => {
    const nextEntries = getRoomNameEntries(rooms);
    setRoomNameEntries((current) =>
      areRoomNameEntriesEqual(current, nextEntries) ? current : nextEntries,
    );
  }, [rooms]);

  useEffect(() => {
    const recentLogsQuery = query(
      ref(db, "alerts"),
      orderByChild("timestamp"),
      limitToLast(LIVE_LOG_LIMIT),
    );
    let receivedSnapshot = false;
    let fallbackUnsub = null;

    const applyEntries = (entries) => {
      receivedSnapshot = true;
      startTransition(() => {
        setRawAlerts(entries);
      });
    };

    const fallbackTimer = window.setTimeout(() => {
      if (receivedSnapshot) return;

      fallbackUnsub = onValue(ref(db, "alerts"), (snapshot) => {
        applyEntries(getRecentAlertEntries(snapshot.val()));
      });
    }, LIVE_LOG_FALLBACK_DELAY);

    const unsub = onValue(
      recentLogsQuery,
      (snapshot) => {
        const entries = [];
        snapshot.forEach((childSnapshot) => {
          const alert = childSnapshot.val();
          if (alert) entries.push([childSnapshot.key, alert]);
        });

        applyEntries(entries);
      },
      (error) => {
        console.error("Failed to load indexed logs query:", error);
        if (fallbackUnsub) return;

        fallbackUnsub = onValue(ref(db, "alerts"), (snapshot) => {
          applyEntries(getRecentAlertEntries(snapshot.val()));
        });
      },
    );

    return () => {
      window.clearTimeout(fallbackTimer);
      unsub();
      if (fallbackUnsub) fallbackUnsub();
    };
  }, []);

  const logs = useMemo(() => {
    const roomNamesByNode = new Map(roomNameEntries);

    return rawAlerts
      .map(([id, alert]) => {
        // Find custom room name from rooms context
        let customRoomName = "-";
        if (alert && alert.node) {
          customRoomName =
            roomNamesByNode.get(alert.node) ||
            `ROOM NO. ${String(alert.node).replace("NODE", "")}`;
        }
        return {
          ...alert,
          id,
          date: alert && alert.timestamp ? alert.timestamp : "-",
          room: customRoomName,
          alert: alert && alert.message ? alert.message : "-",
          entryType: alert?.manualEntry
            ? `Manual (${formatReportChannel(alert.report_channel)})`
            : "Automatic",
          reportedBy: formatReportedBy(alert),
          notes:
            alert && alert.report_notes
              ? String(alert.report_notes).trim()
              : "-",
          temperature:
            alert &&
            alert.temperature !== undefined &&
            alert.temperature !== null
              ? `${alert.temperature} C`
              : "-",
          humidity:
            alert && alert.humidity !== undefined && alert.humidity !== null
              ? `${alert.humidity}%`
              : "-",
          flame: alert && alert.flame === 1 ? "Detected" : "Not Detected",
          smoke:
            alert &&
            alert.Gas_and_Smoke !== undefined &&
            alert.Gas_and_Smoke !== null
              ? `${alert.Gas_and_Smoke} ppm`
              : "-",
          carbonMonoxide:
            alert &&
            alert.carbon_monoxide !== undefined &&
            alert.carbon_monoxide !== null
              ? `${alert.carbon_monoxide} ppm`
              : "-",
        };
      })
      .filter(
        (log) =>
          log.date !== "-" &&
          log.date !== undefined &&
          log.date !== null &&
          log.date !== "",
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [rawAlerts, roomNameEntries]);

  const enqueueManualLog = useCallback((payload) => {
    const queue = loadQueuedManualLogs();
    queue.push(payload);
    saveQueuedManualLogs(queue);
    setQueuedCount(queue.length);
  }, []);

  const syncQueuedManualLogs = useCallback(async () => {
    const queue = loadQueuedManualLogs();
    if (queue.length === 0) {
      setQueuedCount(0);
      return;
    }

    const remaining = [];
    let synced = 0;

    for (const payload of queue) {
      try {
        await push(ref(db, "alerts"), payload);
        synced++;
      } catch {
        remaining.push(payload);
      }
    }

    saveQueuedManualLogs(remaining);
    setQueuedCount(remaining.length);

    if (synced > 0) {
      showToast(
        `${synced} queued record${synced > 1 ? "s were" : " was"} synced.`,
        "success",
      );
    }
  }, [showToast]);

  useEffect(() => {
    setQueuedCount(loadQueuedManualLogs().length);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleOnline = () => {
      setIsOnline(true);
      syncQueuedManualLogs();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    syncQueuedManualLogs();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [syncQueuedManualLogs]);

  const handleManualFieldChange = (key, value) => {
    setManualForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetManualForm = useCallback(() => {
    setManualForm((prev) => ({
      ...initialManualForm,
      roomNode: prev.roomNode,
      customNode: prev.customNode,
      level: prev.level,
      reportChannel: prev.reportChannel,
      timestamp: getDefaultDateTimeLocal(),
    }));
  }, []);

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    const message = manualForm.message.trim();
    if (!message) {
      showToast("Please provide an alarm message for this record.", "warning");
      return;
    }

    const selectedNode =
      manualForm.roomNode || normalizeNodeId(manualForm.customNode);
    if (!selectedNode) {
      showToast("Select a room or enter a node ID (e.g. NODE1).", "warning");
      return;
    }

    const selectedRoom = rooms.find((room) => room.nodeId === manualForm.roomNode);
    const level = String(manualForm.level || "warning").toLowerCase();
    const timestampDate = manualForm.timestamp
      ? new Date(manualForm.timestamp)
      : new Date();
    const safeTimestamp = Number.isNaN(timestampDate.getTime())
      ? new Date()
      : timestampDate;

    const payload = {
      node: selectedNode,
      room:
        selectedRoom?.roomName ||
        `ROOM NO. ${String(selectedNode).replace("NODE", "")}`,
      message,
      level,
      alert_level: level,
      temperature: parseOptionalNumber(manualForm.temperature),
      humidity: parseOptionalNumber(manualForm.humidity),
      Gas_and_Smoke: parseOptionalNumber(manualForm.smoke),
      carbon_monoxide: parseOptionalNumber(manualForm.carbonMonoxide),
      flame: Number(manualForm.flame) === 1 ? 1 : 0,
      timestamp: formatTimestampForStorage(safeTimestamp),
      manualEntry: true,
      report_channel: manualForm.reportChannel,
      report_notes: manualForm.notes.trim() || null,
      reported_by: user?.displayName || user?.email || "unknown",
      reported_by_name: user?.displayName || null,
      reported_by_email: user?.email || null,
    };

    setIsSubmitting(true);

    try {
      if (!navigator.onLine) {
        enqueueManualLog(payload);
        showToast(
          "No internet connection. Record saved locally and queued for sync.",
          "warning",
        );
      } else {
        await push(ref(db, "alerts"), payload);
        showToast("Manual record/report added to logs.", "success");
      }
      resetManualForm();
    } catch {
      enqueueManualLog(payload);
      showToast(
        "Failed to write to server. Record queued locally for automatic sync.",
        "warning",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fg-page">
      <section className="logs-toolbar">
        <div className="logs-toolbar-top">
          <div>
            <div className="logs-form-title">
              Add Manual Record/Report
            </div>
            <p className="logs-form-sub">
              Use this when the central hub cannot upload logs due to unstable
              connection.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`online-badge ${isOnline ? "" : "offline"}`}
            >
              <span className="online-led" />
              {isOnline ? "Online" : "Offline"}
            </span>
            {queuedCount > 0 ? (
              <>
                <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-2 py-1 font-mono text-label text-[#1d4ed8]">
                  {queuedCount} pending sync
                </span>
                <button
                  type="button"
                  onClick={syncQueuedManualLogs}
                  disabled={!isOnline}
                  className="fg-btn"
                >
                  Sync Pending
                </button>
              </>
            ) : null}
            <button
              type="button"
              onClick={() => setShowManualForm((v) => !v)}
              className="fg-btn fg-btn-primary"
            >
              {showManualForm ? "Hide Form" : "Add Record/Report"}
            </button>
          </div>
        </div>

        {showManualForm ? (
          <form onSubmit={handleManualSubmit}>
            <div className="form-grid">
              <label className="form-group">
                <span className="fg-label">Room (optional)</span>
                <select
                  className="fg-select"
                  value={manualForm.roomNode}
                  onChange={(e) =>
                    handleManualFieldChange("roomNode", e.target.value)
                  }
                >
                  <option value="">Select room</option>
                  {rooms.map((room) => (
                    <option key={room.nodeId} value={room.nodeId}>
                      {room.roomName} ({room.nodeId})
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-group">
                <span className="fg-label">Node ID (if room not listed)</span>
                <input
                  type="text"
                  placeholder="NODE1"
                  className="fg-input"
                  value={manualForm.customNode}
                  onChange={(e) =>
                    handleManualFieldChange("customNode", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">Alarm Severity</span>
                <select
                  className="fg-select"
                  value={manualForm.level}
                  onChange={(e) =>
                    handleManualFieldChange("level", e.target.value)
                  }
                >
                  <option value="warning">Warning</option>
                  <option value="alert">Alert</option>
                </select>
              </label>

              <label className="form-group lg:col-span-2">
                <span className="fg-label">Alarm Message</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smoke level rising in room NODE2"
                  className="fg-input"
                  value={manualForm.message}
                  onChange={(e) =>
                    handleManualFieldChange("message", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">Report Timestamp</span>
                <input
                  type="datetime-local"
                  required
                  className="fg-input"
                  value={manualForm.timestamp}
                  onChange={(e) =>
                    handleManualFieldChange("timestamp", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">Temperature (C)</span>
                <input
                  type="number"
                  step="0.1"
                  className="fg-input"
                  value={manualForm.temperature}
                  onChange={(e) =>
                    handleManualFieldChange("temperature", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">Humidity (%)</span>
                <input
                  type="number"
                  step="0.1"
                  className="fg-input"
                  value={manualForm.humidity}
                  onChange={(e) =>
                    handleManualFieldChange("humidity", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">Smoke/Gas (ppm)</span>
                <input
                  type="number"
                  step="0.1"
                  className="fg-input"
                  value={manualForm.smoke}
                  onChange={(e) =>
                    handleManualFieldChange("smoke", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">CO (ppm)</span>
                <input
                  type="number"
                  step="0.1"
                  className="fg-input"
                  value={manualForm.carbonMonoxide}
                  onChange={(e) =>
                    handleManualFieldChange("carbonMonoxide", e.target.value)
                  }
                />
              </label>

              <label className="form-group">
                <span className="fg-label">Flame Sensor</span>
                <select
                  className="fg-select"
                  value={manualForm.flame}
                  onChange={(e) =>
                    handleManualFieldChange("flame", e.target.value)
                  }
                >
                  <option value="0">Not Detected</option>
                  <option value="1">Detected</option>
                </select>
              </label>

              <label className="form-group">
                <span className="fg-label">Report Source</span>
                <select
                  className="fg-select"
                  value={manualForm.reportChannel}
                  onChange={(e) =>
                    handleManualFieldChange("reportChannel", e.target.value)
                  }
                >
                  <option value="central_hub_sms">Central Hub SMS</option>
                  <option value="central_hub_call">Central Hub Call</option>
                  <option value="manual_observation">Manual Observation</option>
                </select>
              </label>

              <label className="form-group form-grid-wide">
                <span className="fg-label">Notes (optional)</span>
                <textarea
                  rows={2}
                  className="fg-textarea"
                  placeholder="Additional details from the report message"
                  value={manualForm.notes}
                  onChange={(e) =>
                    handleManualFieldChange("notes", e.target.value)
                  }
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={resetManualForm}
                className="fg-btn"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="fg-btn fg-btn-primary"
              >
                {isSubmitting ? "Saving..." : "Save Record"}
              </button>
            </div>
          </form>
        ) : null}
      </section>

      <LogsTable logs={logs} />
    </div>
  );
}
