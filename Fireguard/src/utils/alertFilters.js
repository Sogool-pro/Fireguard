import { getAlarmLevel, getTriggeredSensors } from "./sensorThresholds";

export const DEFAULT_ALERT_FILTERS = {
  query: "",
  fromDate: "",
  toDate: "",
  dateDay: "all",
  dateMonth: "all",
  dateYear: "all",
  room: "all",
  severity: "all",
  entryType: "all",
  sensor: "all",
};

export const SEVERITY_FILTER_OPTIONS = [
  ["all", "All severities"],
  ["alert", "Alert"],
  ["warning", "Warning"],
];

export const ENTRY_TYPE_FILTER_OPTIONS = [
  ["all", "All entries"],
  ["automatic", "Automatic"],
  ["manual", "Manual"],
];

export const DAY_FILTER_OPTIONS = [
  ["all", "All days"],
  ...Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    return [String(day), String(day)];
  }),
];

export const MONTH_FILTER_OPTIONS = [
  ["all", "All months"],
  ["1", "January"],
  ["2", "February"],
  ["3", "March"],
  ["4", "April"],
  ["5", "May"],
  ["6", "June"],
  ["7", "July"],
  ["8", "August"],
  ["9", "September"],
  ["10", "October"],
  ["11", "November"],
  ["12", "December"],
];

export const SENSOR_FILTER_OPTIONS = [
  ["all", "All sensors"],
  ["temperature", "Temperature"],
  ["humidity", "Humidity"],
  ["gas", "Smoke/Gas"],
  ["co", "CO"],
  ["flame", "Flame"],
];

const SENSOR_MESSAGE_MATCHERS = {
  temperature: [/\btemp(?:erature)?\b/i],
  humidity: [/\bhumid(?:ity)?\b/i],
  gas: [/\b(?:smoke|gas|mq2)\b/i],
  co: [/\bco\b/i, /\bcarbon(?:\s+monoxide)?\b/i, /\bmq7\b/i],
};

export function formatRoomLabel(value) {
  const text = String(value || "-").trim();
  if (!text || text === "-") return "-";

  const roomNoMatch = text.match(/^room\s*no\.?\s*(\d+)$/i);
  if (roomNoMatch) return `Room No. ${roomNoMatch[1]}`;

  const roomMatch = text.match(/^room\s*(\d+)$/i);
  if (roomMatch) return `Room ${roomMatch[1]}`;

  return text;
}

function normalizeFilterValue(value) {
  return String(value || "").trim().toLowerCase();
}

function parseAlertDate(value) {
  if (!value || value === "-") return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const normalized =
    typeof value === "string" ? value.replace(" ", "T") : value;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getDateKey(value) {
  const date = parseAlertDate(value);
  if (!date) return "";

  const pad = (part) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}

function getRecordDateKey(record) {
  return getDateKey(record?.date ?? record?.timestamp);
}

function getDateParts(value) {
  const date = parseAlertDate(value);
  if (!date) return null;

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

function getRecordDateParts(record) {
  return getDateParts(record?.date ?? record?.timestamp);
}

function getRecordEntryType(record) {
  const entryType = normalizeFilterValue(record?.entryType);
  const manualEntry =
    record?.manualEntry === true ||
    entryType.includes("manual") ||
    normalizeFilterValue(record?.report_channel) === "manual_observation";

  return manualEntry ? "manual" : "automatic";
}

export function getMessageTriggeredSensorKeys(message) {
  const text = String(message || "");
  if (!text) return [];

  return Object.entries(SENSOR_MESSAGE_MATCHERS)
    .filter(([, matchers]) => matchers.some((matcher) => matcher.test(text)))
    .map(([sensorKey]) => sensorKey);
}

export function isFlameTriggered(record) {
  const flame = String(record?.flame || "")
    .trim()
    .toLowerCase();
  const message = String(
    record?.alert || record?.message || record?.alert_message || "",
  ).toLowerCase();

  return record?.flame === 1 || flame === "detected" || message.includes("flame");
}

export function getRecordTriggeredSensorKeys(record, thresholds) {
  const message = [
    record?.alert,
    record?.message,
    record?.alert_message,
  ].join(" ");
  const sensorKeys = new Set([
    ...getTriggeredSensors(record, thresholds).map((sensor) => sensor.sensorKey),
    ...getMessageTriggeredSensorKeys(message),
  ]);

  if (isFlameTriggered(record)) sensorKeys.add("flame");

  return sensorKeys;
}

export function buildRoomFilterOptions(records, getRoomLabel) {
  const rooms = new Map();

  records.forEach((record) => {
    const label = formatRoomLabel(getRoomLabel(record));
    if (!label || label === "-") return;
    rooms.set(normalizeFilterValue(label), label);
  });

  return Array.from(rooms, ([value, label]) => ({ value, label })).sort((a, b) =>
    a.label.localeCompare(b.label, undefined, { numeric: true }),
  );
}

export function buildYearFilterOptions(records) {
  const years = new Set();

  records.forEach((record) => {
    const dateParts = getRecordDateParts(record);
    if (dateParts) years.add(dateParts.year);
  });

  return Array.from(years)
    .sort((a, b) => b - a)
    .map((year) => ({ value: String(year), label: String(year) }));
}

export function countActiveFilters(filters) {
  return Object.entries(DEFAULT_ALERT_FILTERS).reduce((total, [key, value]) => {
    const current = filters[key] ?? value;
    return current !== value && String(current).trim() !== "" ? total + 1 : total;
  }, 0);
}

function matchesDatePartFilter(filterValue, recordValue) {
  return (
    !filterValue ||
    filterValue === "all" ||
    Number(filterValue) === recordValue
  );
}

export function matchesAlertFilters(record, filters, options = {}) {
  const thresholds = options.thresholds;
  const roomLabel = formatRoomLabel(
    options.getRoomLabel
      ? options.getRoomLabel(record)
      : record?.room ?? record?.node ?? "-",
  );
  const query = normalizeFilterValue(filters.query);

  if (query) {
    const searchable = [
      ...Object.values(record || {}),
      roomLabel,
      getRecordEntryType(record),
      getAlarmLevel(record, thresholds),
    ]
      .join(" ")
      .toLowerCase();

    if (!searchable.includes(query)) return false;
  }

  if (filters.fromDate || filters.toDate) {
    const dateKey = getRecordDateKey(record);
    if (!dateKey) return false;
    if (filters.fromDate && dateKey < filters.fromDate) return false;
    if (filters.toDate && dateKey > filters.toDate) return false;
  }

  const dateDayFilter = filters.dateDay ?? DEFAULT_ALERT_FILTERS.dateDay;
  const dateMonthFilter = filters.dateMonth ?? DEFAULT_ALERT_FILTERS.dateMonth;
  const dateYearFilter = filters.dateYear ?? DEFAULT_ALERT_FILTERS.dateYear;

  if (
    dateDayFilter !== "all" ||
    dateMonthFilter !== "all" ||
    dateYearFilter !== "all"
  ) {
    const dateParts = getRecordDateParts(record);
    if (!dateParts) return false;
    if (!matchesDatePartFilter(dateDayFilter, dateParts.day)) return false;
    if (!matchesDatePartFilter(dateMonthFilter, dateParts.month)) return false;
    if (!matchesDatePartFilter(dateYearFilter, dateParts.year)) return false;
  }

  if (filters.room !== "all" && normalizeFilterValue(roomLabel) !== filters.room) {
    return false;
  }

  if (filters.severity !== "all") {
    const severity = getAlarmLevel(record, thresholds);
    if (severity !== filters.severity) return false;
  }

  if (filters.entryType !== "all" && getRecordEntryType(record) !== filters.entryType) {
    return false;
  }

  if (filters.sensor !== "all") {
    const triggeredSensors = getRecordTriggeredSensorKeys(record, thresholds);
    if (!triggeredSensors.has(filters.sensor)) return false;
  }

  return true;
}
