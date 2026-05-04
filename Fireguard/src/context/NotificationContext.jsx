import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRoom } from "./RoomContext";
import { db } from "../firebase";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [dashboardAlert, setDashboardAlert] = useState(false);
  const [logsAlert, setLogsAlert] = useState(false);
  const [lastViewedLogs, setLastViewedLogs] = useState(null);
  const [lastViewedDashboard, setLastViewedDashboard] = useState(null);
  const [latestLogTime, setLatestLogTime] = useState(null);
  const location = useLocation();
  const { rooms } = useRoom();

  // Check for blinking rooms in dashboard
  useEffect(() => {
    const hasBlinkingRooms = rooms.some((room) => {
      if (room.status !== "Active") return false;
      if (room.fire) return true;
      // Alarm thresholds per design: Temp >55, Smoke >600, CO >70
      const isFire =
        room.temperature > 55 || room.smoke > 600 || room.carbonMonoxide > 70;
      // Warning thresholds per design: Temp 41-55, Smoke 301-600, CO 36-70, Humidity 86-95
      const isWarning =
        (room.temperature > 40 && room.temperature <= 55) ||
        (room.smoke > 300 && room.smoke <= 600) ||
        (room.carbonMonoxide > 35 && room.carbonMonoxide <= 70) ||
        (room.humidity > 85 && room.humidity <= 95);
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
    const latestLogQuery = query(
      ref(db, "alerts"),
      orderByChild("timestamp"),
      limitToLast(1),
    );
    const unsub = onValue(latestLogQuery, (snapshot) => {
      const data = snapshot.val() || {};
      const latestLog = Object.values(data).find((alert) => alert?.timestamp);
      setLatestLogTime(latestLog?.timestamp || null);
    });
    return () => unsub();
  }, []);

  // Check for new logs
  useEffect(() => {
    if (latestLogTime) {
      const latestLogMs = new Date(
        String(latestLogTime).replace(" ", "T"),
      ).getTime();

      if (Number.isNaN(latestLogMs)) return;

      if (
        lastViewedLogs &&
        latestLogMs > lastViewedLogs &&
        location.pathname !== "/logs"
      ) {
        setLogsAlert(true);
      } else if (location.pathname === "/logs") {
        setLogsAlert(false);
        setLastViewedLogs(Date.now());
      }
    }
  }, [latestLogTime, lastViewedLogs, location.pathname]);

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
