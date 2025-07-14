import React from "react";
import RoomTile from "../components/RoomTile";
import { useRoom } from "../context/RoomContext";
import { FaHome } from "react-icons/fa";
import DashboardStats from "../components/DashboardStats";

export default function Dashboard() {
  const { rooms } = useRoom();

  return (
    <div className="p-4 ml-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <DashboardStats
        totalRooms={rooms.length}
        alertsToday={0} // TODO: Replace with real data
        unacknowledgedAlerts={0} // TODO: Replace with real data
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room, idx) => (
          <RoomTile key={idx} roomIndex={idx} {...room} />
        ))}
      </div>
    </div>
  );
}
