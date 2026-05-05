import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import buzzer from "../public/buzzer.mp3";
import { useThresholds } from "./ThresholdContext";
import { shouldPlayRoomBuzzer } from "../utils/sensorThresholds";
const RoomContext = createContext();

const SENSOR_DATA_IDLE_TIMEOUT_MS = 60000;
const SENSOR_DATA_IDLE_CHECK_MS = 1000;

export function useRoom() {
  return useContext(RoomContext);
}

function didNodeTimeout(sensor) {
  const alertMessage = String(sensor?.alert_message || "").toLowerCase();
  return sensor?.active === false || alertMessage.includes("node timeout");
}

function getSensorDataSignature(sensor = {}) {
  return JSON.stringify([
    sensor.timestamp ?? "",
    sensor.temperature ?? "",
    sensor.humidity ?? "",
    sensor.Gas_and_Smoke ?? "",
    sensor.carbon_monoxide ?? "",
    sensor.flame ?? "",
    sensor.alert_level ?? "",
    sensor.alert_message ?? "",
    sensor.active ?? "",
  ]);
}

function parseSensorTimestamp(timestamp, fallback) {
  if (!timestamp) return fallback;

  const parsedTime = new Date(String(timestamp).replace(" ", "T")).getTime();
  return Number.isNaN(parsedTime) ? fallback : parsedTime;
}

function getOfflineRoom(room, offlineReason = "sensor-idle") {
  return {
    ...room,
    temperature: 0,
    humidity: 0,
    smoke: 0,
    carbonMonoxide: 0,
    flame: 0,
    fire: false,
    status: "Offline",
    silenced: true,
    isOffline: true,
    offlineReason,
  };
}

export function RoomProvider({ children }) {
  const { thresholds } = useThresholds();
  const [rooms, setRooms] = useState([]);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef(null);
  const sensorDataSignaturesRef = useRef(new Map());
  const lastSensorDataAtRef = useRef(new Map());

  useEffect(() => {
    const sensorRef = ref(db, "sensor_data");
    const unsub = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val() || {};
      const now = Date.now();
      const activeNodes = new Set(Object.keys(data));

      sensorDataSignaturesRef.current.forEach((_, node) => {
        if (!activeNodes.has(node)) {
          sensorDataSignaturesRef.current.delete(node);
          lastSensorDataAtRef.current.delete(node);
        }
      });

      const roomsArr = Object.entries(data).map(([node, sensor]) => {
        // Keep the hub timestamp for display/history; offline status also honors the hub timeout payload.
        const sensorTimestamp = parseSensorTimestamp(sensor.timestamp, now);
        const sensorDataSignature = getSensorDataSignature(sensor);
        const previousSignature = sensorDataSignaturesRef.current.get(node);

        if (previousSignature !== sensorDataSignature) {
          sensorDataSignaturesRef.current.set(node, sensorDataSignature);
          lastSensorDataAtRef.current.set(node, now);
        } else if (!lastSensorDataAtRef.current.has(node)) {
          lastSensorDataAtRef.current.set(node, now);
        }

        const lastSensorDataAt = lastSensorDataAtRef.current.get(node) ?? now;
        const sensorSilenced = !!sensor.silenced;
        const nodeTimedOut = didNodeTimeout(sensor);
        const sensorDataIdle =
          !nodeTimedOut && now - lastSensorDataAt >= SENSOR_DATA_IDLE_TIMEOUT_MS;
        const isOffline = nodeTimedOut || sensorDataIdle;
        const isSilenced = isOffline ? true : sensorSilenced;

        return {
          // include the node id so other parts (settings) can reference it
          nodeId: node,
          // roomName will be replaced below if a custom name exists
          roomName: `ROOM NO. ${node.replace("NODE", "")}`,
          temperature: isOffline ? 0 : sensor.temperature ?? 0,
          humidity: isOffline ? 0 : sensor.humidity ?? 0,
          smoke: isOffline ? 0 : sensor.Gas_and_Smoke ?? 0,
          carbonMonoxide: isOffline ? 0 : sensor.carbon_monoxide ?? 0,
          flame: isOffline ? 0 : sensor.flame ?? 0,
          fire:
            !isOffline &&
            (sensor.flame === 1 ||
              (sensor.alert_level &&
                sensor.alert_level.toLowerCase() === "alert")),
          status: isOffline ? "Offline" : sensorSilenced ? "Silenced" : "Active",
          alert_level: sensor.alert_level,
          alert_message: sensor.alert_message,
          silenced: isSilenced,
          lastUpdated: sensorTimestamp,
          lastSensorDataAt,
          isOffline,
          offlineReason: nodeTimedOut
            ? "node-timeout"
            : sensorDataIdle
              ? "sensor-idle"
              : null,
          sensorTimestampString: sensor.timestamp,
        };
      });
      // If there are custom room names loaded, apply them
      setRooms((prev) => {
        // try to preserve any previous mapping from nodeId to custom names
        return roomsArr.map((r) => {
          const existing = prev.find((p) => p.nodeId === r.nodeId);

          if (existing) {
            return {
              ...r,
              roomName: existing.customName || r.roomName,
              customName: existing.customName,
              archived: existing.archived,
              onRepair: existing.onRepair,
            };
          }
          return r;
        });
      });
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();

      setRooms((current) => {
        let changed = false;
        const nextRooms = current.map((room) => {
          if (
            room.isOffline ||
            !Number.isFinite(room.lastSensorDataAt) ||
            now - room.lastSensorDataAt < SENSOR_DATA_IDLE_TIMEOUT_MS
          ) {
            return room;
          }

          changed = true;
          return getOfflineRoom(room);
        });

        return changed ? nextRooms : current;
      });
    }, SENSOR_DATA_IDLE_CHECK_MS);

    return () => clearInterval(intervalId);
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
        }),
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
        }),
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

  // Check for active warnings/alerts and set buzzer state
  useEffect(() => {
    const anyAlarm = rooms.some((room) =>
      shouldPlayRoomBuzzer(room, thresholds),
    );

    setBuzzerOn(anyAlarm);
  }, [rooms, thresholds]);

  const toggleRoomSilence = (nodeId) => {
    if (!nodeId) return;

    const targetRoom = rooms.find((room) => room.nodeId === nodeId);
    if (!targetRoom) return;

    const previousSilenced = !!targetRoom.silenced;
    const nextSilenced = !previousSilenced;

    setRooms((current) =>
      current.map((room) => {
        if (room.nodeId !== nodeId) return room;

        return {
          ...room,
          silenced: nextSilenced,
          status: room.isOffline
            ? "Offline"
            : nextSilenced
              ? "Silenced"
              : "Active",
        };
      }),
    );

    update(ref(db, `sensor_data/${nodeId}`), { silenced: nextSilenced }).catch(
      (err) => {
        console.error("Failed to sync silence state to Firebase:", err);
        setRooms((current) =>
          current.map((room) =>
            room.nodeId === nodeId
              ? {
                  ...room,
                  silenced: previousSilenced,
                  status: room.isOffline
                    ? "Offline"
                    : previousSilenced
                      ? "Silenced"
                      : "Active",
                }
              : room,
          ),
        );
      },
    );
  };

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
        toggleRoomSilence,
      }}
    >
      <audio ref={audioRef} src={buzzer} preload="auto" />
      {children}
    </RoomContext.Provider>
  );
}
