import React, { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { useThresholds } from "../context/ThresholdContext";
import { downloadLogsWorkbook } from "../utils/logWorkbookExport";
import {
  formatAlarmLevelLabel,
  getAlarmLevel,
  getTriggeredSensors,
} from "../utils/sensorThresholds";

const SENSOR_MESSAGE_MATCHERS = {
  temperature: [/\btemp(?:erature)?\b/i],
  humidity: [/\bhumid(?:ity)?\b/i],
  gas: [/\b(?:smoke|gas|mq2)\b/i],
  co: [/\bco\b/i, /\bcarbon(?:\s+monoxide)?\b/i, /\bmq7\b/i],
};

function formatLogDateParts(dateStr) {
  if (!dateStr || dateStr === "-") return { date: "-", time: "" };
  const normalized =
    typeof dateStr === "string" ? dateStr.replace(" ", "T") : dateStr;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return { date: dateStr, time: "" };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hour = date.getHours();
  const min = date.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12;

  return {
    date: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    time: `${hour}:${min} ${ampm}`,
  };
}

function formatRoomLabel(value) {
  const text = String(value || "-").trim();
  if (!text || text === "-") return "-";

  const roomNoMatch = text.match(/^room\s*no\.?\s*(\d+)$/i);
  if (roomNoMatch) return `Room No. ${roomNoMatch[1]}`;

  const roomMatch = text.match(/^room\s*(\d+)$/i);
  if (roomMatch) return `Room ${roomMatch[1]}`;

  return text;
}

function formatAlarmText(value) {
  const text = String(value || "-").trim();
  if (!text || text === "-") return "-";

  return text
    .replace(/^(escalated\s+alert|alert|warning|warn)\s*[:;-]\s*/i, "")
    .replace(/\s+/g, " ");
}

function getPageItems(currentPage, totalPages) {
  if (totalPages === 0) return [];
  if (totalPages === 1) return [1];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, "end-ellipsis", totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, "start-ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "start-ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "end-ellipsis",
    totalPages,
  ];
}

function getMessageTriggeredSensorKeys(message) {
  const text = String(message || "");
  if (!text) return [];

  return Object.entries(SENSOR_MESSAGE_MATCHERS)
    .filter(([, matchers]) => matchers.some((matcher) => matcher.test(text)))
    .map(([sensorKey]) => sensorKey);
}

function isFlameTriggered(log) {
  const flame = String(log?.flame || "").trim().toLowerCase();
  const message = String(log?.alert || log?.message || "").toLowerCase();

  return log?.flame === 1 || flame === "detected" || message.includes("flame");
}

export default function LogsTable({ logs }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const { thresholds } = useThresholds();
  const rowsPerPage = 6;

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return logs;

    return logs.filter((log) => {
      const haystack = Object.values(log).join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [logs, search]);

  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = useMemo(
    () => filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [filteredLogs, page],
  );
  const pageItems = useMemo(
    () => getPageItems(page, totalPages),
    [page, totalPages],
  );

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Excel Export
  const handleExportExcel = async () => {
    setExporting(true);
    try {
      downloadLogsWorkbook(filteredLogs);
    } finally {
      setExporting(false);
    }
  };

  const getAlarmTone = (level) => {
    if (level === "warning") return "warning";
    return "danger";
  };

  return (
    <div className="table-card">
      <div className="table-toolbar">
        <label className="table-search">
          <Search className="h-3.5 w-3.5 text-[#a1a1aa]" />
          <input
            placeholder="Search logs..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExportExcel}
            className="fg-btn fg-btn-success text-xs"
            disabled={exporting}
            type="button"
          >
            <Download className="h-3.5 w-3.5" />
            {exporting ? "Preparing..." : "Download Excel"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="fg-table logs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Room</th>
              <th>Alarm</th>
              <th>Temp</th>
              <th>Humidity</th>
              <th>Flame</th>
              <th>Smoke Level</th>
              <th>CO Level</th>
              <th>Entry Type</th>
              <th>Recorded By</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((log, idx) => {
              const alarmLevel = getAlarmLevel(log, thresholds);
              const alarmTone = getAlarmTone(alarmLevel);
              const alarmLevelLabel = formatAlarmLevelLabel(alarmLevel);
              const dateParts = formatLogDateParts(log.date);
              const triggeredSensorKeys = new Set([
                ...getTriggeredSensors(log, thresholds).map(
                  (sensor) => sensor.sensorKey,
                ),
                ...getMessageTriggeredSensorKeys(log.alert),
              ]);
              const getSensorTone = (sensorKey) =>
                triggeredSensorKeys.has(sensorKey) ? alarmTone : "";
              const flameTone = isFlameTriggered(log) ? alarmTone : "";

              return (
                <tr key={log.id || idx}>
                  <td className="log-date-cell">
                    <span>{dateParts.date}</span>
                    {dateParts.time ? <span>{dateParts.time}</span> : null}
                  </td>
                  <td className="log-room-cell">{formatRoomLabel(log.room)}</td>
                  <td>
                    <span className={`alarm-chip ${alarmTone}`}>
                      <span className="alarm-chip-icon" aria-hidden="true" />
                      <span className="alarm-chip-text">
                        <span className="alarm-chip-level">
                          {alarmLevelLabel}
                        </span>
                        <span className="alarm-chip-separator">-</span>
                        <span>{formatAlarmText(log.alert)}</span>
                      </span>
                    </span>
                  </td>
                  <td
                    className={`font-mono sensor-log-value ${getSensorTone(
                      "temperature",
                    )}`}
                  >
                    {log.temperature}
                  </td>
                  <td
                    className={`font-mono sensor-log-value ${getSensorTone(
                      "humidity",
                    )}`}
                  >
                    {log.humidity}
                  </td>
                  <td
                    className={`font-mono sensor-log-value ${
                      flameTone || "text-[#71717a]"
                    }`}
                  >
                    {log.flame}
                  </td>
                  <td
                    className={`font-mono sensor-log-value ${getSensorTone(
                      "gas",
                    )}`}
                  >
                    {log.smoke}
                  </td>
                  <td
                    className={`font-mono sensor-log-value ${getSensorTone(
                      "co",
                    )}`}
                  >
                    {log.carbonMonoxide}
                  </td>
                  <td className="text-[#71717a]">{log.entryType}</td>
                  <td>{log.reportedBy}</td>
                  <td className="log-notes-cell">{log.notes}</td>
                </tr>
              );
            })}
            {paginatedLogs.length === 0 && (
              <tr>
                <td colSpan={11} className="py-6 text-center text-[#a1a1aa]">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="pagination">
        <div className="page-info">
          {filteredLogs.length === 0
            ? "Showing 0 entries"
            : `Showing ${(page - 1) * rowsPerPage + 1}-${Math.min(
                page * rowsPerPage,
                filteredLogs.length,
              )} of ${filteredLogs.length} entries`}
        </div>
        <div className="page-btns">
          <button
            className="page-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            type="button"
          >
            &larr;
          </button>
          {pageItems.map((item) =>
            typeof item === "number" ? (
              <button
                key={item}
                className={`page-btn ${page === item ? "active" : ""}`}
                onClick={() => setPage(item)}
                type="button"
              >
                {item}
              </button>
            ) : (
              <span key={item} className="page-btn page-ellipsis">
                ...
              </span>
            ),
          )}
          <button
            className="page-btn"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            type="button"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
