// src/components/AlarmWatcher.jsx
import { useRoom } from "../context/RoomContext";
import { useAlarmModal } from "../context/AlarmModalContext";
import { useRef, useEffect } from "react";

function getAlarmMessage(room) {
  if (room.alert_message && room.alert_message !== "Normal") {
    return `${room.alert_message} (Room: ${room.roomName})`;
  }
  if (room.fire) return `Fire detected in ${room.roomName}!`;
  if (room.temperature > 50) return `High temperature in ${room.roomName}!`;
  if (room.smoke > 800) return `High smoke level in ${room.roomName}!`;
  if (room.carbonMonoxide > 800) return `High CO in ${room.roomName}!`;
  return null;
}

export default function AlarmWatcher() {
  const { rooms } = useRoom();
  const { showAlarm } = useAlarmModal();
  const prevAlarms = useRef({});

  useEffect(() => {
    rooms.forEach((room) => {
      const alarmMsg = getAlarmMessage(room);
      if (alarmMsg && !prevAlarms.current[room.roomName]) {
        showAlarm(alarmMsg);
        prevAlarms.current[room.roomName] = true;
      } else if (!alarmMsg) {
        prevAlarms.current[room.roomName] = false;
      }
    });
  }, [rooms, showAlarm]);

  return null;
}
