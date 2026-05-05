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
      warningMax: 50,
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
      warningMax: 100,
      alert: 100,
    },
  },
};

const SENSOR_VALUE_ALIASES = {
  temperature: ["temperature", "temp"],
  gas: ["smoke", "Gas_and_Smoke", "gas", "mq2Value"],
  co: ["carbonMonoxide", "carbon_monoxide", "co", "mq7Value"],
  humidity: ["humidity"],
};

const ALARM_LEVEL_FIELDS = ["alert_level", "level", "severity", "type", "status"];

export const ALARM_LEVEL_LABELS = {
  alert: "Alert",
  warning: "Warning",
  normal: "Normal",
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

export function parseSensorReading(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const text = String(value).trim();
  if (!text || text === "-") return null;

  const match = text.replace(/,/g, "").match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;

  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizePair(sensorKey, rawPair = {}) {
  const defaults = SENSOR_THRESHOLD_DEFINITIONS[sensorKey].defaults;
  let warning = toFiniteNumber(rawPair.warning, defaults.warning);
  let warningMax =
    toOptionalFiniteNumber(rawPair.warningMax) ??
    toOptionalFiniteNumber(rawPair.warning_max);
  let alert = toFiniteNumber(rawPair.alert, defaults.alert);

  if (warningMax === null) {
    warningMax = alert;
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

export function getSensorReading(source, sensorKey) {
  if (!source || !SENSOR_THRESHOLD_DEFINITIONS[sensorKey]) return null;

  const keys = SENSOR_VALUE_ALIASES[sensorKey] || [
    SENSOR_THRESHOLD_DEFINITIONS[sensorKey].valueKey,
  ];

  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

    const reading = parseSensorReading(source[key]);
    if (reading !== null) return reading;
  }

  return null;
}

export function getSensorLevelFromReading(value, sensorKey, thresholds) {
  const reading = parseSensorReading(value);
  if (reading === null) return "normal";

  return getSensorLevel(reading, sensorKey, thresholds);
}

export function getTriggeredSensors(source, thresholds) {
  return SENSOR_THRESHOLD_ORDER.map((sensorKey) => {
    const definition = SENSOR_THRESHOLD_DEFINITIONS[sensorKey];
    const value = getSensorReading(source, sensorKey);
    const level =
      value === null ? "normal" : getSensorLevel(value, sensorKey, thresholds);

    return {
      sensorKey,
      label: definition.label,
      unit: definition.unit,
      value,
      level,
    };
  }).filter((sensor) => sensor.level !== "normal");
}

export function normalizeAlarmLevel(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return "";

  if (
    text.includes("escalated") ||
    text.includes("alert") ||
    text.includes("alarm") ||
    text.includes("danger") ||
    text.includes("critical")
  ) {
    return "alert";
  }

  if (text.includes("warning") || text.includes("warn")) {
    return "warning";
  }

  if (text.includes("normal") || text.includes("info")) {
    return "normal";
  }

  return "";
}

export function getAlarmLevel(source, thresholds) {
  if (!source) return "alert";

  for (const field of ALARM_LEVEL_FIELDS) {
    const level = normalizeAlarmLevel(source[field]);
    if (level) return level;
  }

  const flameText = String(source.flame || "").toLowerCase();
  if (
    source.fire ||
    source.flame === 1 ||
    flameText === "detected" ||
    flameText.includes("flame detected")
  ) {
    return "alert";
  }

  const messageLevel =
    normalizeAlarmLevel(source.alert_message) ||
    normalizeAlarmLevel(source.message) ||
    normalizeAlarmLevel(source.alert);

  if (messageLevel && messageLevel !== "normal") return messageLevel;

  const triggeredSensors = getTriggeredSensors(source, thresholds);
  if (triggeredSensors.some((sensor) => sensor.level === "alert")) {
    return "alert";
  }
  if (triggeredSensors.some((sensor) => sensor.level === "warning")) {
    return "warning";
  }

  return messageLevel || "alert";
}

export function formatAlarmLevelLabel(level) {
  return ALARM_LEVEL_LABELS[normalizeAlarmLevel(level)] || ALARM_LEVEL_LABELS.alert;
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

export function shouldPlayRoomBuzzer(room, thresholds) {
  if (!room || room.isOffline || room.silenced === true) return false;

  const message = String(room.alert_message || "").toLowerCase();
  const messageAlarm =
    message.includes("alert") ||
    message.includes("flame") ||
    message.includes("warning");

  return (
    isRoomAlert(room, thresholds) ||
    isRoomWarning(room, thresholds) ||
    messageAlarm
  );
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

export function formatSensorUnit(unit) {
  return unit === "C" ? "\u00b0C" : unit;
}

export function formatThresholdWithUnit(sensorKey, value) {
  const unit = SENSOR_THRESHOLD_DEFINITIONS[sensorKey]?.unit || "";
  const formatted = formatThresholdNumber(sensorKey, value);

  if (!unit || unit === "ratio") return formatted;
  if (unit === "%") return `${formatted}%`;
  return `${formatted} ${formatSensorUnit(unit)}`;
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
