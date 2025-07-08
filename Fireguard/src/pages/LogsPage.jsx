import React, { useEffect, useState } from "react";
import LogsTable from "../components/LogsTable";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const unsub = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const logsArr = Object.entries(data)
        .map(([id, alert]) => ({
          ...alert,
          id,
          date: alert.timestamp,
          room: alert.node ? `ROOM NO. ${alert.node.replace("NODE", "")}` : "-",
          alert: alert.message,
          temperature: alert.temperature ? `${alert.temperature}°C` : "-",
          humidity: alert.humidity ? `${alert.humidity}%` : "-",
          flame: alert.flame === 1 ? "Detected" : "Not Detected",
          smoke: alert.Gas_and_Smoke ? `${alert.Gas_and_Smoke} ppm` : "-",
          carbonMonoxide: alert.carbon_monoxide
            ? `${alert.carbon_monoxide} ppm`
            : "-",
        }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setLogs(logsArr);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-4 ml-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Logs</h1>
      <LogsTable logs={logs} />
    </div>
  );
}
