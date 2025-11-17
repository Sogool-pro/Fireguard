import React from "react";
import { FaHome, FaThermometerHalf, FaCloud, FaPowerOff } from "react-icons/fa";
import { MdCo2 } from "react-icons/md";
import { GiSmokeBomb } from "react-icons/gi";
import { useRoom } from "../context/RoomContext";
import { db } from "../firebase";
import { ref, update } from "firebase/database";
import { useRoomChartModal } from "../context/RoomChartModalContext";

// Blinking Logic
function getBlinkingClass({
  alert_level,
  status,
  fire,
  temperature,
  smoke,
  carbonMonoxide,
}) {
  if (status !== "Active") return "";
  const thresholdAlarm =
    fire || temperature > 55 || smoke > 600 || carbonMonoxide > 70;
  if (alert_level && alert_level.toLowerCase() === "warning")
    return "blink-yellow";
  if (thresholdAlarm || (alert_level && alert_level.toLowerCase() === "alert"))
    return "blink-red";
  return "";
}

export default function RoomTile(props) {
  const { rooms, setRooms, setBuzzerOn } = useRoom();
  const room = props;
  const { showRoomChart } = useRoomChartModal();

  const blinkingClass = getBlinkingClass(room);

  // Control global buzzer based on any blinking tile
  React.useEffect(() => {
    if (room.isOffline) {
      setBuzzerOn(false);
      return;
    }

    if (blinkingClass) {
      setBuzzerOn(true);
    } else {
      // Check if any other room is blinking (exclude this room by nodeId if present)
      const anyBlinking = rooms.some((r) => {
        if (r.nodeId && room.nodeId)
          return getBlinkingClass(r) && r.nodeId !== room.nodeId;
        return getBlinkingClass(r) && r.roomName !== room.roomName;
      });
      if (!anyBlinking) setBuzzerOn(false);
    }
    // eslint-disable-next-line
  }, [blinkingClass, rooms, setBuzzerOn, room.isOffline]);

  const handlePowerClick = () => {
    setRooms((prev) =>
      prev.map((r) =>
        r.nodeId === room.nodeId
          ? { ...r, status: r.status === "Active" ? "Silenced" : "Active" }
          : r
      )
    );
    // Determine node key from nodeId if available, otherwise fallback to parsing roomName
    let nodeKey = null;
    if (room.nodeId) nodeKey = room.nodeId;
    else {
      const nodeMatch = room.roomName.match(/ROOM NO\. ?(\d+)/i);
      if (nodeMatch) nodeKey = `NODE${nodeMatch[1]}`;
    }
    if (nodeKey) {
      update(ref(db, `sensor_data/${nodeKey}`), {
        silenced: room.status === "Active" ? true : false,
      });
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-md p-6 w-full max-w-full transition duration-300 transform hover:-translate-y-1 cursor-pointer ${
        room.isOffline
          ? "bg-gray-300"
          : blinkingClass
          ? blinkingClass
          : "bg-white"
      }`}
      onClick={() => showRoomChart(room)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <FaHome className="text-2xl md:text-3xl text-gray-800" />
          <span className="text-xl md:text-2xl font-bold text-gray-800">
            {room.roomName}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePowerClick();
          }}
          className={`p-1 rounded-full transition-colors cursor-pointer ${
            room.status === "Active"
              ? "bg-green-100 hover:bg-green-200"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label="Toggle Room Status"
        >
          <FaPowerOff
            className={`text-2xl ${
              room.status === "Active" ? "text-green-600" : "text-gray-500"
            }`}
          />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-4">
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Temperature
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.isOffline ? 0 : room.temperature}°C
            <FaThermometerHalf className="text-base text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Carbon monoxide
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.isOffline ? 0 : room.carbonMonoxide}
            <span className="text-xs font-normal text-gray-500">ppm</span>
            <MdCo2 className="text-2xl text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Humidity
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.isOffline ? 0 : room.humidity}%
            <FaCloud className="text-base text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Smoke and Gas
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.isOffline ? 0 : room.smoke}
            <span className="text-xs font-normal text-gray-500">ppm</span>
            <GiSmokeBomb className="text-2xl text-gray-500" />
          </div>
        </div>
      </div>
      <hr className="my-2 border-gray-300" />
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm md:text-lg font-semibold text-gray-700">
          Status
        </span>
        <span className="text-sm md:text-lg font-bold text-gray-800">
          {room.status}
        </span>
      </div>
    </div>
  );
}
