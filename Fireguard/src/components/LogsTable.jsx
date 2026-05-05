import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Download, Search } from "lucide-react";
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

const SENSOR_DETAIL_LABELS = {
  temperature: "Temperature",
  humidity: "Humidity",
  gas: "Smoke & Gas",
  co: "CO",
};

const LOG_TABLE_COLUMN_COUNT = 11;

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

function getLogRowKey(log, index) {
  return log.id || `${log.date || "log"}-${log.node || log.room || "room"}-${index}`;
}

function formatDetailValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";

  const text = String(value).trim();
  return text || "-";
}

function getTriggeredSensorSummary(triggeredSensorKeys, flameTriggered) {
  const labels = Array.from(triggeredSensorKeys)
    .map((sensorKey) => SENSOR_DETAIL_LABELS[sensorKey] || sensorKey)
    .filter(Boolean);

  if (flameTriggered) labels.push("Flame");

  return labels.length > 0 ? labels.join(", ") : "-";
}

function LogDetailItem({ label, value, tone = "" }) {
  return (
    <div className="log-detail-item">
      <dt>{label}</dt>
      <dd className={tone ? `log-detail-value ${tone}` : "log-detail-value"}>
        {formatDetailValue(value)}
      </dd>
    </div>
  );
}

export default function LogsTable({ logs }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [expandedLogKey, setExpandedLogKey] = useState(null);
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
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
      setExpandedLogKey(null);
    }
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
              setExpandedLogKey(null);
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
              const rowKey = getLogRowKey(log, idx);
              const isExpanded = expandedLogKey === rowKey;
              const triggeredSummary = getTriggeredSensorSummary(
                triggeredSensorKeys,
                !!flameTone,
              );
              const toggleExpanded = () =>
                setExpandedLogKey((current) =>
                  current === rowKey ? null : rowKey,
                );

              return (
                <React.Fragment key={rowKey}>
                  <tr
                    className={`log-main-row ${isExpanded ? "expanded" : ""}`}
                    onClick={toggleExpanded}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleExpanded();
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} log details for ${formatAlarmText(
                      log.alert,
                    )}`}
                  >
                    <td className="log-date-cell">
                      <span className="log-date-line">
                        <span
                          className={`log-expand-icon ${
                            isExpanded ? "expanded" : ""
                          }`}
                          aria-hidden="true"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <span>{dateParts.date}</span>
                      </span>
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
                  {isExpanded ? (
                    <tr className="log-detail-row">
                      <td colSpan={LOG_TABLE_COLUMN_COUNT} className="log-detail-cell">
                        <div className={`log-detail-panel ${alarmTone}`}>
                          <div className="log-detail-head">
                            <div>
                              <div className="log-detail-kicker">
                                {alarmLevelLabel} details
                              </div>
                              <div className="log-detail-title">
                                {formatAlarmText(log.alert)}
                              </div>
                            </div>
                            <span className={`alarm-chip ${alarmTone}`}>
                              <span className="alarm-chip-icon" aria-hidden="true" />
                              <span className="alarm-chip-text">
                                <span className="alarm-chip-level">
                                  {alarmLevelLabel}
                                </span>
                              </span>
                            </span>
                          </div>

                          <div className="log-detail-grid">
                            <section className="log-detail-section">
                              <h4>Record</h4>
                              <dl>
                                <LogDetailItem
                                  label="Date"
                                  value={`${dateParts.date}${
                                    dateParts.time ? ` ${dateParts.time}` : ""
                                  }`}
                                />
                                <LogDetailItem
                                  label="Room"
                                  value={formatRoomLabel(log.room)}
                                />
                                <LogDetailItem label="Node" value={log.node || log.nodeId} />
                                <LogDetailItem label="Log ID" value={log.id} />
                              </dl>
                            </section>

                            <section className="log-detail-section">
                              <h4>Alarm</h4>
                              <dl>
                                <LogDetailItem
                                  label="Level"
                                  value={alarmLevelLabel}
                                  tone={alarmTone}
                                />
                                <LogDetailItem
                                  label="Triggered"
                                  value={triggeredSummary}
                                  tone={alarmTone}
                                />
                                <LogDetailItem
                                  label="Message"
                                  value={formatAlarmText(log.alert)}
                                  tone={alarmTone}
                                />
                                <LogDetailItem
                                  label="Raw Level"
                                  value={log.alert_level || log.level}
                                />
                              </dl>
                            </section>

                            <section className="log-detail-section">
                              <h4>Sensors</h4>
                              <dl>
                                <LogDetailItem
                                  label="Temperature"
                                  value={log.temperature}
                                  tone={getSensorTone("temperature")}
                                />
                                <LogDetailItem
                                  label="Humidity"
                                  value={log.humidity}
                                  tone={getSensorTone("humidity")}
                                />
                                <LogDetailItem
                                  label="Flame"
                                  value={log.flame}
                                  tone={flameTone}
                                />
                                <LogDetailItem
                                  label="Smoke/Gas"
                                  value={log.smoke}
                                  tone={getSensorTone("gas")}
                                />
                                <LogDetailItem
                                  label="CO"
                                  value={log.carbonMonoxide}
                                  tone={getSensorTone("co")}
                                />
                              </dl>
                            </section>

                            <section className="log-detail-section">
                              <h4>Report</h4>
                              <dl>
                                <LogDetailItem label="Entry Type" value={log.entryType} />
                                <LogDetailItem label="Recorded By" value={log.reportedBy} />
                                <LogDetailItem label="Channel" value={log.report_channel} />
                                <LogDetailItem label="Manual Entry" value={log.manualEntry} />
                                <LogDetailItem label="Notes" value={log.notes} />
                              </dl>
                            </section>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
            {paginatedLogs.length === 0 && (
              <tr>
                <td
                  colSpan={LOG_TABLE_COLUMN_COUNT}
                  className="py-6 text-center text-[#a1a1aa]"
                >
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
            onClick={() => {
              setExpandedLogKey(null);
              setPage((p) => Math.max(1, p - 1));
            }}
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
                onClick={() => {
                  setExpandedLogKey(null);
                  setPage(item);
                }}
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
            onClick={() => {
              setExpandedLogKey(null);
              setPage((p) => Math.min(totalPages, p + 1));
            }}
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
