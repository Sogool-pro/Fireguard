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
          date: alert && alert.timestamp ? alert.timestamp : "-",
          room:
            alert && alert.node
              ? `ROOM NO. ${String(alert.node).replace("NODE", "")}`
              : "-",
          alert: alert && alert.message ? alert.message : "-",
          temperature:
            alert &&
            alert.temperature !== undefined &&
            alert.temperature !== null
              ? `${alert.temperature}°C`
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
        }))
        .filter(
          (log) =>
            log.date !== "-" &&
            log.date !== undefined &&
            log.date !== null &&
            log.date !== ""
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setLogs(logsArr);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-4 ml-5">
      <LogsTable logs={logs} />
    </div>
  );
}
