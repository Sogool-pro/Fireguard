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
    fire || temperature > 50 || smoke > 800 || carbonMonoxide > 800;
  if (alert_level && alert_level.toLowerCase() === "warning")
    return "blink-yellow";
  if (thresholdAlarm || (alert_level && alert_level.toLowerCase() === "alert"))
    return "blink-red";
  return "";
}

export default function RoomTile(props) {
  const { rooms, setRooms, setBuzzerOn } = useRoom();
  const { roomIndex, ...room } = props;
  const { showRoomChart } = useRoomChartModal();

  const blinkingClass = getBlinkingClass(room);

  // Control global buzzer based on any blinking tile
  React.useEffect(() => {
    if (blinkingClass) {
      setBuzzerOn(true);
    } else {
      // Check if any other room is blinking
      const anyBlinking = rooms.some(
        (r, idx) => getBlinkingClass(r) && idx !== roomIndex
      );
      if (!anyBlinking) setBuzzerOn(false);
    }
    // eslint-disable-next-line
  }, [blinkingClass, rooms, setBuzzerOn, roomIndex]);

  const handlePowerClick = () => {
    setRooms((prev) =>
      prev.map((r, idx) =>
        idx === roomIndex
          ? { ...r, status: r.status === "Active" ? "Deactivated" : "Active" }
          : r
      )
    );
    // Find the node name from roomName (e.g., ROOM NO. 1 -> NODE1)
    const nodeMatch = room.roomName.match(/ROOM NO\. ?(\d+)/i);
    if (nodeMatch) {
      const nodeKey = `NODE${nodeMatch[1]}`;
      update(ref(db, `sensor_data/${nodeKey}`), {
        silenced: room.status === "Active" ? true : false,
      });
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-md p-6 w-full max-w-full transition duration-300 transform hover:-translate-y-1 cursor-pointer ${
        blinkingClass ? blinkingClass : "bg-white"
      }`}
      onClick={() => showRoomChart(room)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <FaHome className="text-3xl text-gray-800" />
          <span className="text-2xl font-bold text-gray-800">
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
            {room.temperature}°C
            <FaThermometerHalf className="text-base text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Carbon monoxide
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.carbonMonoxide}
            <span className="text-xs font-normal text-gray-500">ppm</span>
            <MdCo2 className="text-2xl text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Humidity
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.humidity}%
            <FaCloud className="text-base text-gray-500" />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            Smoke
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-gray-800">
            {room.smoke}
            <span className="text-xs font-normal text-gray-500">ppm</span>
            <GiSmokeBomb className="text-2xl text-gray-500" />
          </div>
        </div>
      </div>
      <hr className="my-2 border-gray-300" />
      <div className="flex justify-between items-center pt-2">
        <span className="text-lg font-semibold text-gray-700">Status</span>
        <span className="text-lg font-bold text-gray-800">{room.status}</span>
      </div>
    </div>
  );
}
