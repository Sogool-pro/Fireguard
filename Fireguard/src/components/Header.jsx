import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Bell, ExternalLink } from "lucide-react";
import { useRoom } from "../context/RoomContext";
import { useThresholds } from "../context/ThresholdContext";
import { useNotification } from "../context/NotificationContext";
import { db } from "../firebase";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import buzzer from "../public/buzzer.mp3";
import { shouldPlayRoomBuzzer } from "../utils/sensorThresholds";
import { formatRecentAlertTime } from "../utils/formatRecentAlertTime";

export default function Header() {
  const { rooms } = useRoom();
  const { thresholds } = useThresholds();
  const { logsAlert, setLogsAlert } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const notifRef = useRef();
  const buzzerAudioRef = useRef(null);

  const shouldBuzzerPlay = useMemo(
    () => rooms.some((room) => shouldPlayRoomBuzzer(room, thresholds)),
    [rooms, thresholds],
  );

  // Play or stop buzzer.mp3 based on the same state that drives warning/alert room cards.
  useEffect(() => {
    if (!buzzerAudioRef.current) {
      buzzerAudioRef.current = new Audio(buzzer);
      buzzerAudioRef.current.loop = true;
      buzzerAudioRef.current.preload = "auto";
    }

    const audio = buzzerAudioRef.current;
    const stopBuzzer = () => {
      audio.pause();
      audio.currentTime = 0;
    };
    const playBuzzer = () => {
      if (!shouldBuzzerPlay) return;
      audio.volume = 1.0;
      audio.play().catch(() => {});
    };

    if (!shouldBuzzerPlay) {
      stopBuzzer();
      return undefined;
    }

    playBuzzer();

    window.addEventListener("keydown", playBuzzer);
    window.addEventListener("pointerdown", playBuzzer);
    window.addEventListener("touchstart", playBuzzer);

    return () => {
      window.removeEventListener("keydown", playBuzzer);
      window.removeEventListener("pointerdown", playBuzzer);
      window.removeEventListener("touchstart", playBuzzer);
      stopBuzzer();
    };
  }, [shouldBuzzerPlay]);

  // Fetch last 10 alerts from Firebase
  useEffect(() => {
    if (!showNotifications) return undefined;

    const recentAlertsQuery = query(
      ref(db, "alerts"),
      orderByChild("timestamp"),
      limitToLast(10),
    );
    const unsub = onValue(recentAlertsQuery, (snapshot) => {
      const data = snapshot.val() || {};
      const alertsArr = Object.entries(data)
        .map(([id, alert]) => ({ ...alert, id }))
        .filter((alert) => alert && alert.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
      setRecentAlerts(alertsArr);
    });
    return () => unsub();
  }, [showNotifications]);

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

  const location = useLocation();
  const navigate = useNavigate();

  const pageTitles = {
    "/": "Dashboard",
    "/logs": "Logs",
    "/analytics": "Reports",
    "/users": "Users",
    "/settings": "Settings",
    "/profile": "Profile",
  };
  const pageTitle = pageTitles[location.pathname] || "Fireguard";

  const topbarDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <>
      <header className="relative z-30 flex min-h-[62px] items-center justify-between gap-4 border-b border-[#e4e4e0] bg-white/95 px-5 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-[18px] md:px-7">
        <div className="min-w-0">
          <span className="text-base font-semibold tracking-normal text-[#18181b]">
            {pageTitle}
          </span>
          <span className="ml-2.5 font-mono text-label uppercase tracking-[0.03em] text-[#a1a1aa]">
            {topbarDate}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <a
            href="tel:0848231773"
            className="hidden items-center gap-2 rounded-full border border-[#e4e4e0] bg-white px-3 py-2 transition-colors hover:border-[#bf2d2d] hover:bg-[#fef2f2] sm:flex"
          >
            <span className="relative h-[7px] w-[7px] rounded-full bg-[#bf2d2d]">
              <span className="absolute -inset-0.5 rounded-full border border-[#bf2d2d] opacity-60 animate-ping" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-[#bf2d2d]">
                Panabo City Fire Station
              </span>
              <span className="block truncate text-micro text-[#a1a1aa]">
                (084) 823-1773 / 0928-458-7586
              </span>
            </span>
            <ExternalLink className="h-3 w-3 flex-none text-[#bf2d2d]" />
          </a>

          {/* Notifications */}
          <div className="relative z-[9100]" ref={notifRef}>
            <button
              className="relative flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-[#e4e4e0] bg-white text-[#71717a] transition-colors hover:bg-[#fafaf8]"
              onClick={() => {
                setShowNotifications((v) => !v);
                setLogsAlert(false);
              }}
              aria-label="Show notifications"
            >
              <Bell size={16} />
              {logsAlert ? (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full border-2 border-white bg-[#bf2d2d]"></span>
              ) : null}
            </button>
            {showNotifications && (
              <>
                <div className="fixed right-8 top-[64px] z-[99999] hidden w-[372px] overflow-hidden rounded-[18px] border border-[rgba(24,24,27,0.09)] bg-white shadow-[0_28px_70px_rgba(15,23,42,0.22),0_0_0_1px_rgba(255,255,255,0.72)] md:block">
                  <div className="flex items-center justify-between border-b border-[#eeeeeb] bg-gradient-to-b from-white to-[#fbfbf9] px-4 py-3.5">
                    <div className="text-detail font-bold tracking-normal text-[#18181b]">
                      Recent Alerts
                    </div>
                    <div className="rounded-full border border-[#fecaca] bg-[#fef2f2] px-2 py-1 font-mono text-micro text-[#bf2d2d]">
                      {recentAlerts.length} Latest
                    </div>
                  </div>
                  {recentAlerts.length === 0 ? (
                    <div className="p-4 text-sm text-[#71717a]">
                      No recent alerts.
                    </div>
                  ) : (
                    <ul className="max-h-[330px] overflow-y-auto">
                      {recentAlerts.map((alert) => (
                        <li
                          key={alert.id}
                          className="flex gap-3 border-b border-[#eeeeeb] px-4 py-3 transition-colors hover:bg-[#fafaf8]"
                        >
                          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] border border-[#fecaca] bg-[#fef2f2] text-[#bf2d2d]">
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
                                    className="h-3.5 w-3.5"
                                    title="Alert"
                                  />
                                );
                              } else if (
                                level === "warning" ||
                                msg.includes("warning")
                              ) {
                                return (
                                  <FaExclamationTriangle
                                    className="h-3.5 w-3.5 text-[#c47d0a]"
                                    title="Warning"
                                  />
                                );
                              } else {
                                return null;
                              }
                            })()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-[#18181b]">
                              {alert.node
                                ? `Room ${String(alert.node).replace(
                                    "NODE",
                                    "",
                                  )}`
                                : "Unknown Room"}
                            </div>
                            <div className="mt-0.5 truncate text-xs leading-5 text-[#71717a]">
                              {alert.message || "-"}
                            </div>
                            <div className="mt-1 font-mono text-micro text-[#a1a1aa]">
                              {formatRecentAlertTime(alert.timestamp)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="border-t border-[#eeeeeb] bg-white px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/logs");
                      }}
                      className="text-xs font-semibold text-[#bf2d2d]"
                    >
                      View all logs
                    </button>
                  </div>
                </div>

                <div className="fixed left-20 right-4 top-16 z-[99999] max-h-[40vh] overflow-y-auto rounded-2xl border border-[#e4e4e0] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.2)] md:hidden">
                  <div className="border-b border-[#eeeeeb] px-3 py-2 text-sm font-semibold text-[#18181b]">
                    Recent Alerts
                  </div>
                  {recentAlerts.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-[#71717a]">
                      No recent alerts.
                    </div>
                  ) : (
                    <ul>
                      {recentAlerts.map((alert) => (
                        <li
                          key={alert.id}
                          className="flex items-start gap-2 border-b border-[#eeeeeb] px-3 py-2 transition-colors hover:bg-[#fafaf8]"
                        >
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#bf2d2d]">
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
                                    className="h-4 w-4"
                                    title="Alert"
                                  />
                                );
                              } else if (
                                level === "warning" ||
                                msg.includes("warning")
                              ) {
                                return (
                                  <FaExclamationTriangle
                                    className="h-4 w-4 text-[#c47d0a]"
                                    title="Warning"
                                  />
                                );
                              } else {
                                return null;
                              }
                            })()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-[#18181b]">
                              {alert.node
                                ? `Room ${String(alert.node).replace(
                                    "NODE",
                                    "",
                                  )}`
                                : "Unknown Room"}
                            </div>
                            <div className="text-sm text-[#71717a]">
                              {alert.message || "-"}
                            </div>
                            <div className="mt-0.5 text-xs text-[#a1a1aa]">
                              {formatRecentAlertTime(alert.timestamp)}
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
        </div>
      </header>
    </>
  );
}
