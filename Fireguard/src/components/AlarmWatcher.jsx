// src/components/AlarmWatcher.jsx
import { useRoom } from "../context/RoomContext";
import { useAlarmModal } from "../context/AlarmModalContext";
import { useRef, useEffect } from "react";
import { useThresholds } from "../context/ThresholdContext";
import { isSensorAlert } from "../utils/sensorThresholds";

function getAlarmMessage(room, thresholds) {
  // Do not show modal if alert_level or alert_message is 'Normal' or 'Normal condition'
  const alertLevel = room.alert_level
    ? String(room.alert_level).toLowerCase()
    : "";
  const alertMsg = room.alert_message
    ? String(room.alert_message).toLowerCase()
    : "";
  if (
    alertLevel === "normal" ||
    alertLevel === "normal condition" ||
    alertMsg === "normal" ||
    alertMsg === "normal condition"
  ) {
    return null;
  }
  if (room.alert_message && room.alert_message !== "Normal") {
    return `${room.alert_message} (Room: ${room.roomName})`;
  }
  if (room.fire) return `Fire detected in ${room.roomName}!`;
  if (isSensorAlert(room.temperature, "temperature", thresholds)) {
    return `High temperature in ${room.roomName}!`;
  }
  if (isSensorAlert(room.smoke, "gas", thresholds)) {
    return `High smoke level in ${room.roomName}!`;
  }
  if (isSensorAlert(room.carbonMonoxide, "co", thresholds)) {
    return `High CO in ${room.roomName}!`;
  }
  if (isSensorAlert(room.humidity, "humidity", thresholds)) {
    return `High humidity in ${room.roomName}!`;
  }
  return null;
}

export default function AlarmWatcher() {
  const { rooms } = useRoom();
  const { showAlarm } = useAlarmModal();
  const { thresholds } = useThresholds();
  const prevAlarms = useRef({});

  useEffect(() => {
    rooms.forEach((room) => {
      const alarmMsg = getAlarmMessage(room, thresholds);
      if (alarmMsg && !prevAlarms.current[room.roomName]) {
        showAlarm({ room });
        prevAlarms.current[room.roomName] = true;
      } else if (!alarmMsg) {
        prevAlarms.current[room.roomName] = false;
      }
    });
  }, [rooms, showAlarm, thresholds]);

  return null;
}
