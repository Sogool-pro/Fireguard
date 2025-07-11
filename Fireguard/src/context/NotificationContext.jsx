import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRoom } from "./RoomContext";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [dashboardAlert, setDashboardAlert] = useState(false);
  const [logsAlert, setLogsAlert] = useState(false);
  const [lastViewedLogs, setLastViewedLogs] = useState(null);
  const [lastViewedDashboard, setLastViewedDashboard] = useState(null);
  const [latestLogs, setLatestLogs] = useState([]);
  const location = useLocation();
  const { rooms } = useRoom();

  // Check for blinking rooms in dashboard
  useEffect(() => {
    const hasBlinkingRooms = rooms.some((room) => {
      if (room.status !== "Active") return false;
      if (room.fire) return true;
      const isFire = room.temperature > 50 || room.smoke > 800;
      const isWarning =
        (room.temperature > 35 && room.temperature <= 50) ||
        (room.smoke > 500 && room.smoke <= 800) ||
        (room.carbonMonoxide > 500 && room.carbonMonoxide <= 800);
      return isFire || isWarning;
    });

    if (hasBlinkingRooms && location.pathname !== "/") {
      setDashboardAlert(true);
    } else if (location.pathname === "/") {
      setDashboardAlert(false);
      setLastViewedDashboard(Date.now());
    }
  }, [rooms, location.pathname]);

  // Monitor logs for new entries
  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const unsub = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const logsArr = Object.entries(data)
        .map(([id, alert]) => ({
          ...alert,
          id,
          timestamp: alert.timestamp,
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setLatestLogs(logsArr);
    });
    return () => unsub();
  }, []);

  // Check for new logs
  useEffect(() => {
    if (latestLogs.length > 0) {
      const latestLog = latestLogs[0];
      const latestLogTime = new Date(latestLog.timestamp).getTime();

      if (
        lastViewedLogs &&
        latestLogTime > lastViewedLogs &&
        location.pathname !== "/logs"
      ) {
        setLogsAlert(true);
      } else if (location.pathname === "/logs") {
        setLogsAlert(false);
        setLastViewedLogs(Date.now());
      }
    }
  }, [latestLogs, lastViewedLogs, location.pathname]);

  // Set initial view times when component mounts
  useEffect(() => {
    if (location.pathname === "/logs" && !lastViewedLogs) {
      setLastViewedLogs(Date.now());
    }
    if (location.pathname === "/" && !lastViewedDashboard) {
      setLastViewedDashboard(Date.now());
    }
  }, [location.pathname, lastViewedLogs, lastViewedDashboard]);

  return (
    <NotificationContext.Provider
      value={{
        dashboardAlert,
        logsAlert,
        setDashboardAlert,
        setLogsAlert,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
