export const SENSOR_THRESHOLD_ORDER = [
  "temperature",
  "gas",
  "co",
  "humidity",
];

export const SENSOR_THRESHOLD_DEFINITIONS = {
  temperature: {
    label: "Temperature",
    valueKey: "temperature",
    unit: "C",
    precision: 0,
    defaults: {
      warning: 40,
      warningMax: 49,
      alert: 50,
    },
  },
  gas: {
    label: "Smoke & Gas",
    valueKey: "smoke",
    unit: "ppm",
    precision: 1,
    defaults: {
      warning: 1.5,
      warningMax: 3.0,
      alert: 3.0,
    },
  },
  co: {
    label: "Carbon Monoxide",
    valueKey: "carbonMonoxide",
    unit: "ppm",
    precision: 1,
    defaults: {
      warning: 1.5,
      warningMax: 3.0,
      alert: 3.0,
    },
  },
  humidity: {
    label: "Humidity",
    valueKey: "humidity",
    unit: "%",
    precision: 0,
    defaults: {
      warning: 80,
      warningMax: 99,
      alert: 100,
    },
  },
};

export const DEFAULT_SENSOR_THRESHOLDS = SENSOR_THRESHOLD_ORDER.reduce(
  (thresholds, sensorKey) => {
    thresholds[sensorKey] = {
      ...SENSOR_THRESHOLD_DEFINITIONS[sensorKey].defaults,
    };
    return thresholds;
  },
  {},
);

function toFiniteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toOptionalFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function deriveWarningMax(sensorKey, warning, alert) {
  const precision = SENSOR_THRESHOLD_DEFINITIONS[sensorKey].precision;
  const preferredWarningMax = precision === 0 ? alert - 1 : alert;
  return warning < preferredWarningMax ? preferredWarningMax : alert;
}

function normalizePair(sensorKey, rawPair = {}) {
  const defaults = SENSOR_THRESHOLD_DEFINITIONS[sensorKey].defaults;
  let warning = toFiniteNumber(rawPair.warning, defaults.warning);
  let warningMax =
    toOptionalFiniteNumber(rawPair.warningMax) ??
    toOptionalFiniteNumber(rawPair.warning_max);
  let alert = toFiniteNumber(rawPair.alert, defaults.alert);

  if (warningMax === null) {
    warningMax = deriveWarningMax(sensorKey, warning, alert);
  }

  if (warning >= warningMax || warningMax > alert) {
    warning = defaults.warning;
    warningMax = defaults.warningMax;
    alert = defaults.alert;
  }

  return { warning, warningMax, alert };
}

export function normalizeThresholds(rawThresholds = {}) {
  return SENSOR_THRESHOLD_ORDER.reduce((thresholds, sensorKey) => {
    thresholds[sensorKey] = normalizePair(sensorKey, rawThresholds[sensorKey]);
    return thresholds;
  }, {});
}

export function toFirebaseThresholds(thresholds) {
  return normalizeThresholds(thresholds);
}

export function isSensorAlert(value, sensorKey, thresholds) {
  const number = Number(value);
  if (!Number.isFinite(number)) return false;
  const normalized = normalizeThresholds(thresholds);
  return number > normalized[sensorKey].alert;
}

export function isSensorWarning(value, sensorKey, thresholds) {
  const number = Number(value);
  if (!Number.isFinite(number)) return false;
  const normalized = normalizeThresholds(thresholds);
  return (
    number > normalized[sensorKey].warning &&
    number <= normalized[sensorKey].warningMax
  );
}

export function getSensorLevel(value, sensorKey, thresholds) {
  if (isSensorAlert(value, sensorKey, thresholds)) return "alert";
  if (isSensorWarning(value, sensorKey, thresholds)) return "warning";
  return "normal";
}

export function isRoomAlert(room, thresholds) {
  if (!room || room.isOffline) return false;

  const level = String(room.alert_level || "").toLowerCase();
  if (room.fire || level === "alert") return true;

  return SENSOR_THRESHOLD_ORDER.some((sensorKey) => {
    const valueKey = SENSOR_THRESHOLD_DEFINITIONS[sensorKey].valueKey;
    return isSensorAlert(room[valueKey], sensorKey, thresholds);
  });
}

export function isRoomWarning(room, thresholds) {
  if (!room || room.isOffline || isRoomAlert(room, thresholds)) return false;

  const level = String(room.alert_level || "").toLowerCase();
  if (level === "warning") return true;

  return SENSOR_THRESHOLD_ORDER.some((sensorKey) => {
    const valueKey = SENSOR_THRESHOLD_DEFINITIONS[sensorKey].valueKey;
    return isSensorWarning(room[valueKey], sensorKey, thresholds);
  });
}

export function formatThresholdNumber(sensorKey, value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "-";

  const precision = SENSOR_THRESHOLD_DEFINITIONS[sensorKey]?.precision ?? 0;
  if (precision > 0 && Number.isInteger(number)) {
    return number.toFixed(precision);
  }

  return number.toFixed(3).replace(/\.?0+$/, "");
}

export function formatThresholdWithUnit(sensorKey, value) {
  const unit = SENSOR_THRESHOLD_DEFINITIONS[sensorKey]?.unit || "";
  const formatted = formatThresholdNumber(sensorKey, value);

  if (!unit || unit === "ratio") return formatted;
  if (unit === "%") return `${formatted}%`;
  return `${formatted} ${unit}`;
}

export function formatWarningRange(sensorKey, thresholds) {
  const normalized = normalizeThresholds(thresholds);
  const pair = normalized[sensorKey];

  return `>${formatThresholdWithUnit(
    sensorKey,
    pair.warning,
  )} to ${formatThresholdWithUnit(sensorKey, pair.warningMax)}`;
}

export function formatAlertAbove(sensorKey, thresholds) {
  const normalized = normalizeThresholds(thresholds);
  return `>${formatThresholdWithUnit(sensorKey, normalized[sensorKey].alert)}`;
}
