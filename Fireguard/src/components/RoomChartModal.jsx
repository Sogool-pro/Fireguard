import React, { useEffect, useState } from "react";
import { useRoomChartModal } from "../context/RoomChartModalContext";
import { db } from "../firebase";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const HISTORY_TICK = {
  fill: "#a1a1aa",
  fontFamily: "var(--fg-mono)",
  fontSize: 10,
};
const HISTORY_AXIS = { stroke: "#e4e4e0" };
const HISTORY_TOOLTIP = {
  contentStyle: {
    border: "1px solid #e4e4e0",
    borderRadius: 10,
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
    fontSize: 12,
  },
  itemStyle: { fontSize: 12 },
  labelStyle: { color: "#71717a", fontSize: 11 },
};

function parseTimestamp(value) {
  if (!value) return null;
  const date = new Date(String(value).replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatHistoryTime(value) {
  const date = parseTimestamp(value);
  if (!date) return "";
  const minutes = String(date.getMinutes()).padStart(2, "0");
  let hours = date.getHours();
  hours = hours % 12 || 12;
  return `${hours}:${minutes}`;
}

function formatHistoryTooltip(value) {
  const date = parseTimestamp(value);
  if (!date) return value || "";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatRoomName(value) {
  const text = String(value || "Room").trim();
  const roomNoMatch = text.match(/^room\s*no\.?\s*(\d+)$/i);
  if (roomNoMatch) return `Room No. ${roomNoMatch[1]}`;

  const roomMatch = text.match(/^room\s*(\d+)$/i);
  if (roomMatch) return `Room ${roomMatch[1]}`;

  return text;
}

function formatMetric(value, unit = "") {
  if (value === undefined || value === null || value === "") return "-";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return `${value}${unit}`;
  const rounded = Math.round(numeric * 100) / 100;
  return `${rounded}${unit}`;
}

function HistoryChart({
  color,
  data,
  dataKey,
  flame = false,
  full = false,
  subtitle,
  title,
}) {
  return (
    <div className={`history-chart${full ? " full" : ""}`}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 4,
              right: 8,
              bottom: 0,
              left: flame ? 20 : -12,
            }}
          >
            <CartesianGrid stroke="#f0f0ee" />
            <XAxis
              axisLine={HISTORY_AXIS}
              dataKey="time"
              tick={HISTORY_TICK}
              tickFormatter={formatHistoryTime}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              allowDecimals={!flame}
              axisLine={HISTORY_AXIS}
              domain={flame ? [0, 1] : undefined}
              tick={HISTORY_TICK}
              tickFormatter={flame ? (v) => (v === 1 ? "Detected" : "No Flame") : undefined}
              tickLine={false}
              ticks={flame ? [0, 1] : undefined}
              width={flame ? 70 : 38}
            />
            <Tooltip
              {...HISTORY_TOOLTIP}
              labelFormatter={formatHistoryTooltip}
            />
            <Area
              activeDot={{ r: 5, fill: color, stroke: "#fff", strokeWidth: 2 }}
              connectNulls
              dataKey={dataKey}
              dot={{ r: 3.5, fill: color, stroke: color, strokeWidth: 0 }}
              fill={color}
              fillOpacity={flame ? 0.08 : 0.09}
              stroke={color}
              strokeWidth={2}
              type={flame ? "stepAfter" : "monotone"}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function RoomChartModal() {
  const { modal, closeRoomChart } = useRoomChartModal();
  const room = modal.room;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!modal.open || !room) return undefined;

    const node = room.nodeId
      ? room.nodeId
      : room.roomName.replace("ROOM NO. ", "NODE");
    const roomHistoryQuery = query(
      ref(db, "alerts"),
      orderByChild("node"),
      equalTo(node),
    );
    const unsub = onValue(roomHistoryQuery, (snapshot) => {
      const data = snapshot.val() || {};
      const arr = Object.values(data)
        .map((alert) => ({
          ...alert,
          time: alert.timestamp,
          temperature: alert.temperature ?? null,
          humidity: alert.humidity ?? null,
          smoke: alert.Gas_and_Smoke ?? null,
          carbonMonoxide: alert.carbon_monoxide ?? null,
          flame: alert.flame ?? null,
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setHistory(arr);
    });

    return () => unsub();
  }, [modal.open, room]);

  useEffect(() => {
    if (!modal.open) return undefined;

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeRoomChart();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeRoomChart, modal.open]);

  if (!modal.open || !room) return null;

  const latest = history.length ? history[history.length - 1] : {};
  const current = {
    temperature: latest.temperature ?? room.temperature,
    humidity: latest.humidity ?? room.humidity,
    smoke: latest.smoke ?? room.smoke,
    carbonMonoxide: latest.carbonMonoxide ?? room.carbonMonoxide,
  };
  const chartData = history.length
    ? history
    : [
        {
          time: new Date().toISOString(),
          temperature: current.temperature ?? null,
          humidity: current.humidity ?? null,
          smoke: current.smoke ?? null,
          carbonMonoxide: current.carbonMonoxide ?? null,
          flame: room.flame ?? 0,
        },
      ];

  return (
    <div className="history-backdrop" onClick={closeRoomChart}>
      <div
        aria-labelledby="historyTitle"
        aria-modal="true"
        className="history-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="history-head">
          <div>
            <div className="history-kicker">Sensor History</div>
            <div className="history-title" id="historyTitle">
              {formatRoomName(room.roomName)}
            </div>
            <div className="history-sub">
              Recent readings from the installed FireGuard node. Use this view
              to verify alerts, warnings, and sensor behavior.
            </div>
          </div>
          <button
            aria-label="Close"
            className="history-close"
            onClick={closeRoomChart}
            type="button"
          >
            &times;
          </button>
        </div>

        <div className="history-body">
          <div className="history-summary">
            <div className="mini-metric">
              <div className="mini-label">Temperature</div>
              <div className="mini-value">
                {formatMetric(current.temperature, "\u00b0C")}
              </div>
            </div>
            <div className="mini-metric">
              <div className="mini-label">Humidity</div>
              <div className="mini-value">{formatMetric(current.humidity, "%")}</div>
            </div>
            <div className="mini-metric">
              <div className="mini-label">Smoke / Gas</div>
              <div className="mini-value">{formatMetric(current.smoke)}</div>
            </div>
            <div className="mini-metric">
              <div className="mini-label">CO Level</div>
              <div className="mini-value">
                {formatMetric(current.carbonMonoxide)}
              </div>
            </div>
          </div>

          <div className="history-grid">
            <HistoryChart
              color="#bf2d2d"
              data={chartData}
              dataKey="temperature"
              subtitle="Readings over time"
              title="Temperature (\u00b0C)"
            />
            <HistoryChart
              color="#2563eb"
              data={chartData}
              dataKey="humidity"
              subtitle="Room humidity trend"
              title="Humidity (%)"
            />
            <HistoryChart
              color="#8b5cf6"
              data={chartData}
              dataKey="smoke"
              subtitle="Smoke and gas activity"
              title="Smoke / Gas (ppm)"
            />
            <HistoryChart
              color="#c47d0a"
              data={chartData}
              dataKey="carbonMonoxide"
              subtitle="Carbon monoxide trend"
              title="CO (ppm)"
            />
            <HistoryChart
              color="#16803c"
              data={chartData}
              dataKey="flame"
              flame
              full
              subtitle="Detected versus not detected"
              title="Flame Sensor"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
