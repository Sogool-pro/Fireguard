import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onValue, ref, update } from "firebase/database";
import { db } from "../firebase";
import {
  DEFAULT_SENSOR_THRESHOLDS,
  normalizeThresholds,
  toFirebaseThresholds,
} from "../utils/sensorThresholds";

const ThresholdContext = createContext(null);

export function useThresholds() {
  const context = useContext(ThresholdContext);
  if (!context) {
    throw new Error("useThresholds must be used within ThresholdProvider");
  }
  return context;
}

export function ThresholdProvider({ children }) {
  const [thresholds, setThresholds] = useState(DEFAULT_SENSOR_THRESHOLDS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const thresholdsRef = ref(db, "thresholds");
    const unsubscribe = onValue(
      thresholdsRef,
      (snapshot) => {
        setThresholds(normalizeThresholds(snapshot.val() || {}));
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load thresholds:", err);
        setThresholds(DEFAULT_SENSOR_THRESHOLDS);
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const saveThresholds = useCallback(async (nextThresholds) => {
    const normalized = toFirebaseThresholds(nextThresholds);
    await update(ref(db, "thresholds"), normalized);
    setThresholds(normalized);
  }, []);

  const resetThresholds = useCallback(async () => {
    const normalized = toFirebaseThresholds(DEFAULT_SENSOR_THRESHOLDS);
    await update(ref(db, "thresholds"), normalized);
    setThresholds(normalized);
  }, []);

  const value = useMemo(
    () => ({
      thresholds,
      loading,
      error,
      saveThresholds,
      resetThresholds,
    }),
    [error, loading, resetThresholds, saveThresholds, thresholds],
  );

  return (
    <ThresholdContext.Provider value={value}>
      {children}
    </ThresholdContext.Provider>
  );
}
