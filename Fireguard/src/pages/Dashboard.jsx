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
    <div className="p-4 ml-5 flex flex-col min-h-screen">
      <DashboardStats
        totalRooms={rooms.length}
        alertsToday={alertsToday}
        unacknowledgedAlerts={unacknowledgedAlerts}
      />
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {rooms.map((room, idx) => (
          <div
            key={idx}
            className="flex justify-center flex-grow flex-shrink basis-[240px] max-w-[320px]"
          >
            <RoomTile roomIndex={idx} {...room} />
          </div>
        ))}
      </div>
      {/* Legend Footer - Fixed Bottom */}
      <footer className="fixed bottom-0 left-80 w-full max-w-5xl mx-auto z-50">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-yellow-400 animate-pulse"></span>
              <span className="font-semibold text-gray-700">Warning</span>
              <span className="text-gray-500">
                (Temperature 36-50°C, Smoke 501-800 ppm, CO 501-800 ppm,
                Humidity 81-100%)
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full bg-red-500 animate-pulse"></span>
              <span className="font-semibold text-gray-700">Alert</span>
              <span className="text-gray-500">
                (Temperature {">"}50°C, Smoke {">"}800 ppm, CO {">"}800 ppm,
                Flame detected)
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-1 md:gap-0 md:flex-row md:items-center md:justify-end text-gray-600">
            <span className="mr-4">
              <span className="font-semibold">Temperature:</span> Normal {"≤"}
              35°C, Warning 36-50°C, Alert {">"}50°C
            </span>
            <span className="mr-4">
              <span className="font-semibold">Smoke (ppm):</span> Normal {"≤"}
              500, Warning 501-800, Alert {">"}800
            </span>
            <span className="mr-4">
              <span className="font-semibold">CO (ppm):</span> Normal {"≤"}500,
              Warning 501-800, Alert {">"}800
            </span>
            <span className="mr-4">
              <span className="font-semibold">Humidity:</span> Normal {"≤"}80%,
              Warning 81-100%
            </span>
            <span>
              <span className="font-semibold">Flame:</span> Alert if detected
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
