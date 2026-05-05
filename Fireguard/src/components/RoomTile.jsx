import React from "react";
import { Home, Power } from "lucide-react";
import { useRoom } from "../context/RoomContext";
import { useRoomChartModal } from "../context/RoomChartModalContext";
import { useThresholds } from "../context/ThresholdContext";
import {
  getSensorLevel,
  isRoomAlert,
  isRoomWarning,
} from "../utils/sensorThresholds";

function getRoomVisualState(room, thresholds) {
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
  if (isRoomAlert(room, thresholds)) {
    return {
      card: "s-alert",
      status: "alert",
      label: "Alert",
      messageClass: "alert",
      message: room.alert_message || "Sensor alert detected",
    };
  }
  if (isRoomWarning(room, thresholds)) {
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

function sensorTone(value, sensorKey, thresholds) {
  const level = getSensorLevel(value, sensorKey, thresholds);
  if (level === "alert") return "danger";
  if (level === "warning") return "warn";
  return "";
}

export default function RoomTile(props) {
  const { toggleRoomSilence } = useRoom();
  const { showRoomChart } = useRoomChartModal();
  const { thresholds } = useThresholds();
  const room = props;
  const visual = getRoomVisualState(room, thresholds);

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
          <div className={`s-val ${sensorTone(temperature, "temperature", thresholds)}`}>
            {temperature}
            <span className="unit">{"\u00b0C"}</span>
          </div>
        </div>
        <div className="sensor-blk">
          <div className="s-lbl">CO Level</div>
          <div className={`s-val ${sensorTone(carbonMonoxide, "co", thresholds)}`}>
            {carbonMonoxide}
            <span className="unit">ppm</span>
          </div>
        </div>
        <div className="sensor-blk">
          <div className="s-lbl">Humidity</div>
          <div className={`s-val ${sensorTone(humidity, "humidity", thresholds)}`}>
            {humidity}
            <span className="unit">%</span>
          </div>
        </div>
        <div className="sensor-blk">
          <div className="s-lbl">Smoke & Gas</div>
          <div className={`s-val ${sensorTone(smoke, "gas", thresholds)}`}>
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

    </article>
  );
}
