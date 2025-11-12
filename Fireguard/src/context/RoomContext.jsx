import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import buzzer from "../public/buzzer.mp3";
const RoomContext = createContext();

export function useRoom() {
  return useContext(RoomContext);
}

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const sensorRef = ref(db, "sensor_data");
    const unsub = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val() || {};
      const roomsArr = Object.entries(data).map(([node, sensor]) => ({
        // include the node id so other parts (settings) can reference it
        nodeId: node,
        // roomName will be replaced below if a custom name exists
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
      // If there are custom room names loaded, apply them
      setRooms((prev) => {
        // try to preserve any previous mapping from nodeId to custom names
        return roomsArr.map((r) => {
          const existing = prev.find((p) => p.nodeId === r.nodeId);
          if (existing && existing.customName) {
            return {
              ...r,
              roomName: existing.customName,
              customName: existing.customName,
            };
          }
          return r;
        });
      });
    });
    return () => unsub();
  }, []);

  // Listen for custom room names under 'room_names' and merge into rooms
  useEffect(() => {
    const namesRef = ref(db, "room_names");
    const unsubNames = onValue(namesRef, (snapshot) => {
      const data = snapshot.val() || {};
      // data expected to be { NODE1: 'My Lab', NODE2: 'Kitchen', ... }
      setRooms((current) =>
        current.map((r) => {
          if (!r.nodeId) return r;
          const name = data[r.nodeId];
          if (name) return { ...r, roomName: name, customName: name };
          // if no custom name, keep the default roomName (constructed from nodeId)
          return { ...r };
        })
      );
    });
    return () => unsubNames();
  }, []);

  // Listen for room metadata (archived, onRepair etc) under 'room_meta' and merge
  useEffect(() => {
    const metaRef = ref(db, "room_meta");
    const unsubMeta = onValue(metaRef, (snapshot) => {
      const data = snapshot.val() || {};
      setRooms((current) =>
        current.map((r) => {
          if (!r.nodeId) return r;
          const meta = data[r.nodeId] || {};
          return { ...r, archived: !!meta.archived, onRepair: !!meta.onRepair };
        })
      );
    });
    return () => unsubMeta();
  }, []);

  // Simplified buzzer logic - play when there's an alarm
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (buzzerOn) {
      audio.loop = true;
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.log("Buzzer play failed:", error);
        // If autoplay fails, try to enable audio
        setAudioEnabled(false);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [buzzerOn]);

  // Check for alarms and set buzzer state
  useEffect(() => {
    const anyAlarm = rooms.some((room) => {
      const thresholdAlarm =
        room.fire ||
        room.temperature > 55 ||
        room.smoke > 600 ||
        room.carbonMonoxide > 70;
      const alertLevelAlarm =
        room.alert_level && room.alert_level.toLowerCase() === "alert";
      return (thresholdAlarm || alertLevelAlarm) && room.silenced !== true;
    });

    setBuzzerOn(anyAlarm);
  }, [rooms]);

  // Function to manually enable audio (called from header)
  const enableAudio = () => {
    setAudioEnabled(true);
    // Try to play the buzzer if it should be on
    if (buzzerOn && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  // Function to manually test buzzer
  const testBuzzer = () => {
    if (audioRef.current) {
      audioRef.current.loop = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRooms,
        buzzerOn,
        setBuzzerOn,
        audioEnabled,
        enableAudio,
        testBuzzer,
      }}
    >
      <audio ref={audioRef} src={buzzer} preload="auto" />
      {children}
    </RoomContext.Provider>
  );
}
