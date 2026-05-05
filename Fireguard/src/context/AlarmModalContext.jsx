// src/context/AlarmModalContext.jsx
import React, { createContext, useCallback, useContext, useState } from "react";
import { FaExclamationTriangle, FaThermometerHalf } from "react-icons/fa";
import { useThresholds } from "./ThresholdContext";
import {
  formatAlarmLevelLabel,
  formatThresholdWithUnit,
  getAlarmLevel,
  getTriggeredSensors,
} from "../utils/sensorThresholds";

const AlarmModalContext = createContext();

const SENSOR_DISPLAY_LABELS = {
  temperature: "Temperature",
  gas: "Smoke & Gas",
  co: "CO",
  humidity: "Humidity",
};

export function useAlarmModal() {
  return useContext(AlarmModalContext);
}

export function AlarmModalProvider({ children }) {
  const [modal, setModal] = useState({ open: false, alarmData: null });
  const { thresholds } = useThresholds();

  const showAlarm = useCallback((alarmData) => {
    setModal({ open: true, alarmData });
  }, []);

  const closeAlarm = useCallback(() => {
    setModal({ open: false, alarmData: null });
  }, []);

  const getAlarmDetails = (alarmData) => {
    if (!alarmData) {
      return { flameDetected: false, level: "alert", triggeredSensors: [] };
    }

    const room = alarmData.room || alarmData;
    const alertMsg = String(room.alert_message || "");
    const normalizedMessage = alertMsg.toLowerCase();

    return {
      flameDetected: room.fire || normalizedMessage.includes("flame"),
      level: getAlarmLevel(room, thresholds),
      triggeredSensors: getTriggeredSensors(room, thresholds),
    };
  };

  return (
    <AlarmModalContext.Provider value={{ showAlarm, closeAlarm }}>
      {children}
      {modal.open &&
        modal.alarmData &&
        (() => {
          const room = modal.alarmData.room || modal.alarmData;
          const alarmDetails = getAlarmDetails(modal.alarmData);
          const roomName = room.roomName || "Unknown Room";
          const alertMessage = room.alert_message || "";
          const isWarning = alarmDetails.level === "warning";
          const levelLabel = formatAlarmLevelLabel(alarmDetails.level);
          const tone = isWarning
            ? {
                button: "bg-amber-500 hover:bg-amber-600",
                icon: "text-amber-600",
                iconWrap: "bg-amber-100 border-amber-300",
                panel: "bg-amber-50 border-amber-400",
                title: "text-amber-600",
                value: "text-amber-600",
              }
            : {
                button: "bg-red-600 hover:bg-red-700",
                icon: "text-red-600",
                iconWrap: "bg-red-100 border-red-300",
                panel: "bg-pink-50 border-red-400",
                title: "text-red-600",
                value: "text-red-600",
              };

          return (
            <div className="fixed inset-0 z-[110000] flex items-center justify-center bg-white/30 backdrop-blur">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 ${tone.iconWrap}`}
                  >
                    <FaExclamationTriangle className={`${tone.icon} text-lg`} />
                  </div>
                  <h2 className={`text-3xl font-bold uppercase ${tone.title}`}>
                    {levelLabel}!
                  </h2>
                </div>

                <div className={`border rounded-lg p-4 mb-4 ${tone.panel}`}>
                  <div className="flex items-start gap-3">
                    {alarmDetails.triggeredSensors.some(
                      (sensor) => sensor.sensorKey === "temperature",
                    ) && (
                      <FaThermometerHalf
                        className={`${tone.icon} text-xl flex-shrink-0 mt-0.5`}
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-gray-800 font-medium mb-2">
                        {alertMessage}
                      </div>
                      <div className="text-gray-800 mb-1">
                        <span className="font-medium">Level: </span>
                        <span className={`${tone.value} font-semibold`}>
                          {levelLabel}
                        </span>
                      </div>
                      {alarmDetails.flameDetected && (
                        <div className="text-gray-800 mb-1">
                          <span className="font-medium">Flame: </span>
                          <span className={`${tone.value} font-semibold`}>
                            Detected
                          </span>
                        </div>
                      )}
                      {alarmDetails.triggeredSensors.map((sensor) => (
                        <div
                          className="text-gray-800 mb-1"
                          key={sensor.sensorKey}
                        >
                          <span className="font-medium">
                            {SENSOR_DISPLAY_LABELS[sensor.sensorKey] ||
                              sensor.label}
                            :{" "}
                          </span>
                          <span className={`${tone.value} font-semibold`}>
                            {formatThresholdWithUnit(
                              sensor.sensorKey,
                              sensor.value,
                            )}
                          </span>
                        </div>
                      ))}
                      <div className="text-gray-800">
                        <span className="font-medium">Room: </span>
                        <span className="font-bold uppercase">{roomName}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full text-white font-bold py-3 rounded-lg transition-colors ${tone.button}`}
                  onClick={closeAlarm}
                >
                  Dismiss
                </button>
              </div>
            </div>
          );
        })()}
    </AlarmModalContext.Provider>
  );
}
