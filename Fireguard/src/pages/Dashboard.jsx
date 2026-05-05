import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomTile from "../components/RoomTile";
import { useRoom } from "../context/RoomContext";
import { useThresholds } from "../context/ThresholdContext";
import { db } from "../firebase";
import {
  endAt,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import {
  SENSOR_THRESHOLD_DEFINITIONS,
  SENSOR_THRESHOLD_ORDER,
  formatAlarmLevelLabel,
  formatAlertAbove,
  formatWarningRange,
  getAlarmLevel,
  isRoomAlert,
  isRoomWarning,
} from "../utils/sensorThresholds";
import { formatRecentAlertTime } from "../utils/formatRecentAlertTime";

function getAlertTone(level) {
  if (level === "warning") return "warning";
  return "danger";
}

function formatAlertMessage(value) {
  const text = String(value || "-").trim();
  if (!text || text === "-") return "-";

  return text
    .replace(/^(escalated\s+alert|alert|warning|warn)\s*[:;-]\s*/i, "")
    .replace(/\s+/g, " ");
}

export default function Dashboard() {
  const { rooms } = useRoom();
  const { thresholds } = useThresholds();
  const [alertsToday, setAlertsToday] = useState(0);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const todayStr = new Date().toISOString().slice(0, 10);
    const todaysAlertsQuery = query(
      alertsRef,
      orderByChild("timestamp"),
      startAt(todayStr),
      endAt(`${todayStr}\uf8ff`),
    );
    const recentAlertsQuery = query(
      alertsRef,
      orderByChild("timestamp"),
      limitToLast(5),
    );

    const unsubToday = onValue(todaysAlertsQuery, (snapshot) => {
      const data = snapshot.val() || {};
      setAlertsToday(Object.keys(data).length);
    });

    const unsubRecent = onValue(recentAlertsQuery, (snapshot) => {
      const data = snapshot.val() || {};
      const latestAlerts = Object.entries(data)
        .map(([id, alert]) => ({ id, ...alert }))
        .filter((alert) => alert && alert.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5);

      setRecentAlerts(latestAlerts);
    });

    return () => {
      unsubToday();
      unsubRecent();
    };
  }, []);

  const visibleRooms = rooms.filter((room) => !room.archived);
  const warningCount = visibleRooms.filter(
    (room) => !room.isOffline && isRoomWarning(room, thresholds),
  ).length;
  const onlineCount = visibleRooms.filter((room) => !room.isOffline).length;
  const alertCount = visibleRooms.filter(
    (room) => !room.isOffline && isRoomAlert(room, thresholds),
  ).length;

  return (
    <div className="fg-page">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-lbl">Total Rooms</div>
          <div className="stat-num">
            {String(visibleRooms.length).padStart(2, "0")}
          </div>
          <div className="stat-sub">Monitored zones</div>
        </div>
        <div className="stat-card red">
          <div className="stat-lbl">Alerts Today</div>
          <div className="stat-num red">
            {String(alertsToday).padStart(2, "0")}
          </div>
          <div className="stat-sub">Within 24 hours</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-lbl">Warnings</div>
          <div className="stat-num amber">
            {String(warningCount).padStart(2, "0")}
          </div>
          <div className="stat-sub">Active now</div>
        </div>
        <div className="stat-card green">
          <div className="stat-lbl">Online Rooms</div>
          <div className="stat-num green">
            {String(onlineCount).padStart(2, "0")}
          </div>
          <div className="stat-sub">of {visibleRooms.length} active</div>
        </div>
      </div>

      <div className="sec-hdr">
        <span className="sec-title">Rooms</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e4e4e0] bg-white/75 px-3 py-1.5 font-mono text-label text-[#71717a]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16803c]" />
          {alertCount > 0
            ? `${alertCount} active alert`
            : "Auto-registered nodes"}
        </span>
      </div>

      <div className="rooms-grid">
        {visibleRooms.length === 0 ? (
          <div className="fg-card p-8 text-center text-sm text-[#71717a]">
            No rooms found.
          </div>
        ) : (
          visibleRooms.map((room, idx) => (
            <RoomTile key={room.nodeId || idx} {...room} />
          ))
        )}
      </div>

      <div className="bottom-row">
        <div className="alerts-panel">
          <div className="panel-hdr">
            <div className="panel-hdr-title">Recent Alerts</div>
            <button
              type="button"
              className="panel-hdr-link"
              onClick={() => navigate("/logs")}
            >
              View all
            </button>
          </div>
          {recentAlerts.length === 0 ? (
            <div className="p-5 text-sm text-[#71717a]">No recent alerts.</div>
          ) : (
            recentAlerts.map((alert) => {
              const level = getAlarmLevel(alert, thresholds);
              const tone = getAlertTone(level);
              const levelLabel = formatAlarmLevelLabel(level);
              const roomName = alert.node
                ? `Room ${String(alert.node).replace("NODE", "")}`
                : "Unknown Room";
              return (
                <div className="alert-item" key={alert.id}>
                  <div
                    className={`alert-icon ${
                      tone === "warning" ? "warning" : "danger"
                    }`}
                  >
                    !
                  </div>
                  <div className="min-w-0">
                    <div className="alert-room-tag">
                      <span>{roomName}</span>
                      <span className={`alert-level-label ${tone}`}>
                        {levelLabel}
                      </span>
                    </div>
                    <div
                      className={`alert-msg ${
                        tone === "warning" ? "warning" : "danger"
                      }`}
                    >
                      {levelLabel} - {formatAlertMessage(alert.message)}
                    </div>
                    <div className="alert-time">
                      {formatRecentAlertTime(alert.timestamp)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="legend-card">
          <div className="legend-title">Sensor Thresholds</div>
          <table className="legend-table">
            <thead>
              <tr>
                <th>Sensor</th>
                <th>
                  <span className="badge warn">Warning</span>
                </th>
                <th>
                  <span className="badge alert">Alert</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {SENSOR_THRESHOLD_ORDER.map((sensorKey) => (
                <tr key={sensorKey}>
                  <td>{SENSOR_THRESHOLD_DEFINITIONS[sensorKey].label}</td>
                  <td className="font-mono text-[#c47d0a] co-value warning">
                    {formatWarningRange(sensorKey, thresholds)}
                  </td>
                  <td className="font-mono text-[#bf2d2d] co-value danger">
                    {formatAlertAbove(sensorKey, thresholds)}
                  </td>
                </tr>
              ))}
              <tr>
                <td>Flame Sensor</td>
                <td className="font-mono text-[#a1a1aa]">-</td>
                <td className="font-mono text-[#bf2d2d] co-value danger">
                  Detected
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
