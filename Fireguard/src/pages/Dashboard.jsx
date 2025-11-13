import React, { useEffect, useState } from "react";
import RoomTile from "../components/RoomTile";
import { useRoom } from "../context/RoomContext";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  const { rooms } = useRoom();
  const [alertsToday, setAlertsToday] = useState(0);
  const [legendExpanded, setLegendExpanded] = useState(false);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const unsub = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val() || {};
      let todayCount = 0;
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
      Object.values(data).forEach((alert) => {
        if (!alert || !alert.timestamp) return;
        // Check if alert is today
        const alertDate = alert.timestamp.slice(0, 10); // 'YYYY-MM-DD'
        if (alertDate === todayStr) {
          todayCount++;
        }
      });
      setAlertsToday(todayCount);
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-4 md:ml-5 flex flex-col min-h-screen text-sm md:text-base md:pb-24">
      {/* only count rooms that are not archived */}
      {(() => {
        const visibleRooms = rooms.filter((r) => !r.archived);
        return (
          <>
            <DashboardStats
              totalRooms={visibleRooms.length}
              alertsToday={alertsToday}
            />
            <div className="flex flex-wrap justify-center gap-6 px-4">
              {visibleRooms.map((room, idx) => (
                <div
                  key={room.nodeId || idx}
                  className="flex justify-center flex-grow flex-shrink basis-[240px] max-w-[320px]"
                >
                  <RoomTile {...room} />
                </div>
              ))}
            </div>
          </>
        );
      })()}
      {/* Legend Footer: static on mobile (inside main flow), fixed to viewport bottom on md+ */}
      {/* Fixed footer on desktop so it always sits at the bottom of the screen; mobile keeps inline/sticky behavior */}
      {/* Put footer behind the sidebar/backdrop (lower z) and on md+ shift it right by the sidebar width (16rem)
          so it stays within the main content area instead of overlaying the sidebar. */}
      <footer className="sticky bottom-0 md:fixed md:left-64 md:right-0 md:bottom-4 w-full max-w-4xl mx-auto z-10">
        <div className="bg-white rounded-xl shadow-md p-3 md:p-3 flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-4 text-xs md:text-sm">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mobile toggle to show/hide detailed legend text */}
            <button
              className="md:hidden ml-2 text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md"
              onClick={() => setLegendExpanded((v) => !v)}
              aria-expanded={legendExpanded}
              aria-controls="mobile-legend-details"
            >
              {legendExpanded ? "Hide details" : "Show details"}
            </button>
          </div>
          <div className="w-full text-gray-600">
            {/* Mobile: stacked details (toggle) - unchanged behavior */}
            <div
              id="mobile-legend-details"
              className={`${legendExpanded ? "block" : "hidden"} md:hidden`}
            >
              <span className="mr-3 md:mr-4 block">
                <span className="font-semibold">Temperature:</span> Normal {"≤"}
                40°C, Warning 41-55°C, Alert {">"}55°C
              </span>
              <span className="mr-3 md:mr-4 block">
                <span className="font-semibold">Smoke (ppm):</span> Normal {"≤"}
                300, Warning 301-600, Alert {">"}600
              </span>
              <span className="mr-3 md:mr-4 block">
                <span className="font-semibold">CO (ppm):</span> Normal {"≤"}35,
                Warning 36-70, Alert {">"}70
              </span>
              <span className="mr-3 md:mr-4 block">
                <span className="font-semibold">Humidity:</span> Normal {"≤"}
                85%, Warning 86-95%, Alert {">"}95%
              </span>
              <span className="block">
                <span className="font-semibold">Flame:</span> Alert if detected
              </span>
            </div>

            {/* Desktop: legend layout matching the provided screenshot (centered) */}
            <div className="hidden md:flex md:items-center md:justify-center md:gap-6 w-full">
              <div className="flex flex-col items-start ml-6 mr-4">
                <span className="font-semibold text-gray-700 mb-2">
                  Legend:
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-4 h-4 rounded-[4px] bg-yellow-400 animate-pulse"></span>
                  <span className="text-gray-700">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-[4px] bg-red-500 animate-pulse"></span>
                  <span className="text-gray-700">Alert</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-x-6 text-sm mx-auto mt-2">
                <div className="font-semibold">Temperature</div>
                <div className="font-semibold">Gas and Smoke</div>
                <div className="font-semibold">Carbon monoxide</div>
                <div className="font-semibold">Humidity</div>
                <div className="font-semibold">Flame</div>

                <div>41-55°C</div>
                <div>301-600 ppm</div>
                <div>36-70 ppm</div>
                <div>86-95%</div>
                <div className="text-gray-500 mt-2">—</div>

                <div>Above 55°C</div>
                <div>Above 600 ppm</div>
                <div>Above 70 ppm</div>
                <div>Above 70%</div>
                <div>If detected</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
