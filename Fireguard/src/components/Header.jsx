import React, { useState, useEffect, useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Bell, User } from "lucide-react";
import { useRoom } from "../context/RoomContext";
import { useNotification } from "../context/NotificationContext";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { rooms } = useRoom();
  const { logsAlert, setLogsAlert } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const notifRef = useRef();
  const buzzerAudioRef = useRef(null);
  // Determine if buzzer should play: any unacknowledged alert or any blinking tile (active alert)
  const shouldBuzzerPlay =
    recentAlerts.some((a) => a.acknowledged === false) ||
    rooms.some(
      (room) =>
        (room.fire ||
          room.temperature > 50 ||
          room.smoke > 800 ||
          room.carbonMonoxide > 800 ||
          (room.alert_level && room.alert_level.toLowerCase() === "alert")) &&
        room.silenced !== true
    );

  // Play or stop buzzer.mp3 based on shouldBuzzerPlay
  useEffect(() => {
    if (!buzzerAudioRef.current) {
      buzzerAudioRef.current = new Audio("/buzzer.mp3");
      buzzerAudioRef.current.loop = true;
    }
    const audio = buzzerAudioRef.current;
    if (shouldBuzzerPlay) {
      audio.volume = 1.0;
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    // Pause on unmount
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [shouldBuzzerPlay]);

  // Fetch last 10 alerts from Firebase
  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const unsub = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const alertsArr = Object.entries(data)
        .map(([id, alert]) => ({ ...alert, id }))
        .filter((alert) => alert && alert.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
      setRecentAlerts(alertsArr);
    });
    return () => unsub();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  // Helper: time ago
  function timeAgo(dateString) {
    if (!dateString) return "-";
    const now = new Date();
    const date = new Date(dateString.replace(/-/g, "/"));
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return date.toLocaleString();
  }
  const [showDebug, setShowDebug] = useState(false);
  const location = useLocation();

  // Count rooms with alarms
  const alarmRooms = rooms.filter((room) => {
    const thresholdAlarm =
      room.fire ||
      room.temperature > 50 ||
      room.smoke > 800 ||
      room.carbonMonoxide > 800;
    const alertLevelAlarm =
      room.alert_level && room.alert_level.toLowerCase() === "alert";
    return (thresholdAlarm || alertLevelAlarm) && room.silenced !== true;
  });

  const pageTitles = {
    "/": "Dashboard",
    "/logs": "Logs",
    "/analytics": "Analytics",
    "/users": "Users",
    "/settings": "Settings",
  };
  const pageTitle = pageTitles[location.pathname] || "Fireguard";

  return (
    <>
      <header className="bg-white h-16 px-4 flex items-center justify-between border-b border-gray-200">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 ml-4">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {
                setShowNotifications((v) => !v);
                setLogsAlert(false);
              }}
              aria-label="Show notifications"
            >
              <Bell size={20} className="text-gray-600" />
              {logsAlert ||
              recentAlerts.some((a) => a.acknowledged === false) ? (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              ) : null}
            </button>
            {showNotifications && (
              <>
                {/* Desktop dropdown (keeps existing absolute behavior for md+ screens) */}
                <div className="hidden md:block absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto animate-fade-in">
                  <div className="p-4 font-semibold text-black">
                    Recent Alerts
                  </div>
                  {recentAlerts.length === 0 ? (
                    <div className="p-4 text-gray-500 text-sm">
                      No recent alerts.
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {recentAlerts.map((alert) => (
                        <li
                          key={alert.id}
                          className={`px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors
                            ${
                              alert.acknowledged === false
                                ? "bg-white font-bold text-gray-900"
                                : "bg-gray-50 font-normal text-gray-400"
                            }
                          `}
                        >
                          <div className="flex-shrink-0 w-7 h-7 mt-1 flex items-center justify-center">
                            {(() => {
                              const level = (
                                alert.alert_level || ""
                              ).toLowerCase();
                              const msg = (alert.message || "").toLowerCase();
                              if (
                                level === "alert" ||
                                msg.includes("alert") ||
                                msg.includes("flame")
                              ) {
                                return (
                                  <FaExclamationTriangle
                                    className="w-7 h-7"
                                    color="#f87171"
                                    title="Alert"
                                  />
                                );
                              } else if (
                                level === "warning" ||
                                msg.includes("warning")
                              ) {
                                return (
                                  <FaExclamationTriangle
                                    className="w-7 h-7"
                                    color="#facc15"
                                    title="Warning"
                                  />
                                );
                              } else {
                                return null;
                              }
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="font-medium">
                                {alert.node
                                  ? `Room ${String(alert.node).replace(
                                      "NODE",
                                      ""
                                    )}`
                                  : "Unknown Room"}
                              </div>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full border ml-2 ${
                                  alert.acknowledged === false
                                    ? "bg-red-100 text-red-600 border-red-300"
                                    : "bg-green-100 text-green-700 border-green-300"
                                }`}
                              >
                                {alert.acknowledged === false
                                  ? "Unacknowledged"
                                  : "Acknowledged"}
                              </span>
                            </div>
                            <div
                              className={`text-sm ${
                                logsAlert &&
                                (recentAlerts[0]?.id === alert.id ||
                                  alert.acknowledged === false)
                                  ? "text-gray-800"
                                  : "text-gray-400"
                              }`}
                            >
                              {alert.message || "-"}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {timeAgo(alert.timestamp)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Mobile panel: fixed overlay inside main area (appears below header) and above sidebar */}
                <div className="md:hidden fixed top-16 z-60 bg-white border-b border-gray-200 max-h-[40vh] overflow-y-auto left-20 right-4 rounded-lg shadow-sm">
                  <div className="px-3 py-2 font-semibold text-black text-sm">
                    Recent Alerts
                  </div>
                  {recentAlerts.length === 0 ? (
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      No recent alerts.
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {recentAlerts.map((alert) => (
                        <li
                          key={alert.id}
                          className={`px-3 py-2 flex items-start gap-2 hover:bg-gray-50 transition-colors
                            ${
                              alert.acknowledged === false
                                ? "bg-white font-semibold text-gray-900"
                                : "bg-gray-50 font-normal text-gray-500"
                            }
                          `}
                        >
                          <div className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center">
                            {(() => {
                              const level = (
                                alert.alert_level || ""
                              ).toLowerCase();
                              const msg = (alert.message || "").toLowerCase();
                              if (
                                level === "alert" ||
                                msg.includes("alert") ||
                                msg.includes("flame")
                              ) {
                                return (
                                  <FaExclamationTriangle
                                    className="w-5 h-5"
                                    color="#f87171"
                                    title="Alert"
                                  />
                                );
                              } else if (
                                level === "warning" ||
                                msg.includes("warning")
                              ) {
                                return (
                                  <FaExclamationTriangle
                                    className="w-5 h-5"
                                    color="#facc15"
                                    title="Warning"
                                  />
                                );
                              } else {
                                return null;
                              }
                            })()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-medium">
                                {alert.node
                                  ? `Room ${String(alert.node).replace(
                                      "NODE",
                                      ""
                                    )}`
                                  : "Unknown Room"}
                              </div>
                              <span
                                className={`text-[11px] px-2 py-0.5 rounded-full border ml-2 ${
                                  alert.acknowledged === false
                                    ? "bg-red-100 text-red-600 border-red-300"
                                    : "bg-green-100 text-green-700 border-green-300"
                                }`}
                              >
                                {alert.acknowledged === false ? "Unack" : "Ack"}
                              </span>
                            </div>
                            <div
                              className={`text-sm ${
                                logsAlert &&
                                (recentAlerts[0]?.id === alert.id ||
                                  alert.acknowledged === false)
                                  ? "text-gray-800"
                                  : "text-gray-500"
                              }`}
                            >
                              {alert.message || "-"}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {timeAgo(alert.timestamp)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </button>
        </div>
      </header>
    </>
  );
}
