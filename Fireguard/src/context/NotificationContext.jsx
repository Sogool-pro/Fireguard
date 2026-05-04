import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRoom } from "./RoomContext";
import { useThresholds } from "./ThresholdContext";
import { db } from "../firebase";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import { isRoomAlert, isRoomWarning } from "../utils/sensorThresholds";

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
  const { thresholds } = useThresholds();

  // Check for blinking rooms in dashboard
  useEffect(() => {
    const hasBlinkingRooms = rooms.some((room) => {
      if (room.status !== "Active") return false;
      return isRoomAlert(room, thresholds) || isRoomWarning(room, thresholds);
    });

    if (hasBlinkingRooms && location.pathname !== "/") {
      setDashboardAlert(true);
    } else if (location.pathname === "/") {
      setDashboardAlert(false);
      setLastViewedDashboard(Date.now());
    }
  }, [rooms, location.pathname, thresholds]);

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
