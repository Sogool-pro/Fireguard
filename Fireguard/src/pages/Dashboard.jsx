import React, { useEffect, useState } from "react";
import RoomTile from "../components/RoomTile";
import { useRoom } from "../context/RoomContext";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  const { rooms } = useRoom();
  const [alertsToday, setAlertsToday] = useState(0);
  const [unacknowledgedAlerts, setUnacknowledgedAlerts] = useState(0);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const unsub = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val() || {};
      let todayCount = 0;
      let unackCount = 0;
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
      Object.values(data).forEach((alert) => {
        if (!alert || !alert.timestamp) return;
        // Check if alert is today
        const alertDate = alert.timestamp.slice(0, 10); // 'YYYY-MM-DD'
        if (alertDate === todayStr) {
          todayCount++;
        }
        // Check if unacknowledged
        if (alert.acknowledged === false) {
          unackCount++;
        }
      });
      setAlertsToday(todayCount);
      setUnacknowledgedAlerts(unackCount);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-4 ml-5">
      <DashboardStats
        totalRooms={rooms.length}
        alertsToday={alertsToday}
        unacknowledgedAlerts={unacknowledgedAlerts}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room, idx) => (
          <RoomTile key={idx} roomIndex={idx} {...room} />
        ))}
      </div>
    </div>
  );
}
