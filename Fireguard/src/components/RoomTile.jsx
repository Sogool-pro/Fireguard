import React, { useEffect, useState } from "react";
import { Clock, Home, Power } from "lucide-react";
import { useRoom } from "../context/RoomContext";
import { useRoomChartModal } from "../context/RoomChartModalContext";

function hasRoomAlert(room) {
  const level = String(room.alert_level || "").toLowerCase();
  return (
    room.fire ||
    room.temperature > 55 ||
    room.smoke > 600 ||
    room.carbonMonoxide > 70 ||
    level === "alert"
  );
}

function hasRoomWarning(room) {
  return String(room.alert_level || "").toLowerCase() === "warning";
}

function getRoomVisualState(room) {
  if (room.isOffline) {
    return {
      card: "s-offline",
      status: "offline",
      label: "Offline",
      messageClass: "",
      message: "Node offline",
    };
  }
  if (room.silenced) {
    return {
      card: "",
      status: "silenced",
      label: "Silenced",
      messageClass: "",
      message: "Alarm silenced",
    };
  }
  if (hasRoomAlert(room)) {
    return {
      card: "s-alert",
      status: "alert",
      label: "Alert",
      messageClass: "alert",
      message: room.alert_message || "Sensor alert detected",
    };
  }
  if (hasRoomWarning(room)) {
    return {
      card: "s-warning",
      status: "warning",
      label: "Warning",
      messageClass: "warning",
      message: room.alert_message || "Sensor warning detected",
    };
  }
  return {
    card: "",
    status: "online",
    label: "Online",
    messageClass: "",
    message: "Normal readings",
  };
}

function sensorTone(value, warningAt, alertAt) {
  const number = Number(value) || 0;
  if (number >= alertAt) return "danger";
  if (number >= warningAt) return "warn";
  return "";
}

export default function RoomTile(props) {
  const { toggleRoomSilence } = useRoom();
  const { showRoomChart } = useRoomChartModal();
  const room = props;
  const [timeUntilOffline, setTimeUntilOffline] = useState(60);
  const visual = getRoomVisualState(room);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const offlineThreshold = 60000;
      const timeSinceUpdate = now - (room.lastUpdated || now);
      const remainingTime = Math.max(
        0,
        Math.ceil((offlineThreshold - timeSinceUpdate) / 1000),
      );
      setTimeUntilOffline(remainingTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [room.lastUpdated]);

  const handlePowerClick = (event) => {
    event.stopPropagation();
    toggleRoomSilence(room.nodeId);
  };

  const temperature = room.isOffline ? 0 : room.temperature;
  const carbonMonoxide = room.isOffline ? 0 : room.carbonMonoxide;
  const humidity = room.isOffline ? 0 : room.humidity;
  const smoke = room.isOffline ? 0 : room.smoke;

  return (
    <article
      className={`room-card ${visual.card}`}
      onClick={() => showRoomChart(room)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showRoomChart(room);
        }
      }}
    >
      <div className="rc-hdr">
        <div className="flex min-w-0 items-center gap-2">
          <Home className="h-3.5 w-3.5 flex-none text-[#18181b]" />
          <div className="rc-name truncate">{room.roomName}</div>
        </div>
        <div className={`rc-status ${visual.status}`}>
          <div className="rc-led" />
          {visual.label}
        </div>
      </div>

      <div className="rc-sensors">
        <div className="sensor-blk">
          <div className="s-lbl">Temperature</div>
          <div className={`s-val ${sensorTone(temperature, 40, 50)}`}>
            {temperature}
            <span className="unit">C</span>
          </div>
        </div>
        <div className="sensor-blk">
          <div className="s-lbl">CO Level</div>
          <div className={`s-val ${sensorTone(carbonMonoxide, 1.6, 3.1)}`}>
            {carbonMonoxide}
            <span className="unit">ppm</span>
          </div>
        </div>
        <div className="sensor-blk">
          <div className="s-lbl">Humidity</div>
          <div className={`s-val ${sensorTone(humidity, 81, 101)}`}>
            {humidity}
            <span className="unit">%</span>
          </div>
        </div>
        <div className="sensor-blk">
          <div className="s-lbl">Smoke & Gas</div>
          <div className={`s-val ${sensorTone(smoke, 1.6, 3.1)}`}>
            {smoke}
            <span className="unit">ppm</span>
          </div>
        </div>
      </div>

      <div className="rc-footer">
        <div className={`room-message ${visual.messageClass}`}>
          <span className="msg-icon">!</span>
          <span className="msg-text">{visual.message}</span>
        </div>
        <button
          type="button"
          onClick={handlePowerClick}
          disabled={room.isOffline}
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg border transition-colors ${
            room.silenced
              ? "border-[#e4e4e0] bg-white text-[#71717a]"
              : "border-[#86efac] bg-[#f0fdf4] text-[#16803c]"
          } disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label={room.silenced ? "Unsilence alarm" : "Silence alarm"}
        >
          <Power className="h-4 w-4" />
        </button>
      </div>

      {!room.isOffline && (
        <div className="flex items-center justify-between gap-2 border-t border-[#eeeeeb] bg-white px-[18px] py-2 font-mono text-[10px] text-[#a1a1aa]">
          <span className="truncate">
            Last update: {room.sensorTimestampString || "N/A"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fafaf8] px-2 py-1 text-[#71717a]">
            <Clock className="h-3 w-3" />
            {timeUntilOffline}s
          </span>
        </div>
      )}
    </article>
  );
}
