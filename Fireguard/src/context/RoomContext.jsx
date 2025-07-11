import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const RoomContext = createContext();

export function useRoom() {
  return useContext(RoomContext);
}

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const sensorRef = ref(db, "sensor_data");
    const unsub = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val() || {};
      const roomsArr = Object.entries(data).map(([node, sensor]) => ({
        roomName: `ROOM NO. ${node.replace("NODE", "")}`,
        temperature: sensor.temperature ?? 0,
        humidity: sensor.humidity ?? 0,
        smoke: sensor.Gas_and_Smoke ?? 0,
        carbonMonoxide: sensor.carbon_monoxide ?? 0,
        flame: sensor.flame ?? 0,
        fire:
          sensor.flame === 1 ||
          (sensor.alert_level && sensor.alert_level.toLowerCase() === "alert"),
        status:
          sensor.alert_active === false || sensor.silenced
            ? "Deactivated"
            : "Active",
        alert_level: sensor.alert_level,
        alert_message: sensor.alert_message,
        silenced: sensor.silenced,
      }));
      setRooms(roomsArr);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (buzzerOn) {
      audio.loop = true;
      audio.currentTime = 0;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [buzzerOn]);

  useEffect(() => {
    const anyAlarm = rooms.some(room => {
      const thresholdAlarm =
        room.fire ||
        room.temperature > 50 ||
        room.smoke > 800 ||
        room.carbonMonoxide > 800;
      const alertLevelAlarm =
        room.alert_level && room.alert_level.toLowerCase() === "alert";
      return (thresholdAlarm || alertLevelAlarm) && room.silenced !== true;
    });
    setBuzzerOn(anyAlarm);
  }, [rooms]);

  return (
    <RoomContext.Provider value={{ rooms, setRooms, buzzerOn, setBuzzerOn }}>
      <audio ref={audioRef} src="/buzzer.mp3" preload="auto" />
      {children}
    </RoomContext.Provider>
  );
}
