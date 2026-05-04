import React, { startTransition, useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { db } from "../firebase";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import { useRoom } from "../context/RoomContext";

// Helper: Parse timestamp string to Date
function parseTimestamp(ts) {
  if (!ts) return null;
  // Handles both "YYYY-MM-DD HH:mm:ss" and ISO
  return new Date(ts.replace(" ", "T"));
}

// Helper: Map node ID to custom room name
function getRoomName(nodeId, rooms) {
  if (!nodeId) return "Unknown";
  if (rooms instanceof Map) {
    const roomName = rooms.get(nodeId);
    return roomName || `Room ${nodeId.replace("NODE", "")}`;
  }
  const room = rooms.find((r) => r.nodeId === nodeId);
  return room ? room.roomName : `Room ${nodeId.replace("NODE", "")}`;
}

// Helper: Group alerts by month for line chart
function getMonthlyData(alerts) {
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
  const result = Array.from({ length: 12 }, (_, i) => ({
    month: months[i],
    CO: 0,
    Smoke: 0,
    Flame: 0,
  }));
  alerts.forEach((alert) => {
    const date = parseTimestamp(alert.timestamp);
    if (!date) return;
    const m = date.getMonth();
    if (alert.message?.toLowerCase().includes("co")) result[m].CO++;
    if (alert.message?.toLowerCase().includes("smoke")) result[m].Smoke++;
    if (alert.message?.toLowerCase().includes("flame") || alert.flame === 1)
      result[m].Flame++;
  });
  return result;
}

// Helper: Alert type breakdown for bar chart
function getAlertTypeData(alerts) {
  let CO = 0,
    Smoke = 0,
    Flame = 0;
  alerts.forEach((alert) => {
    if (alert.message?.toLowerCase().includes("co")) CO++;
    if (alert.message?.toLowerCase().includes("smoke")) Smoke++;
    if (alert.message?.toLowerCase().includes("flame") || alert.flame === 1)
      Flame++;
  });
  return [
    { name: "CO", value: CO },
    { name: "Smoke", value: Smoke },
    { name: "Flame", value: Flame },
  ];
}

// Helper: Room distribution for pie chart
function getRoomData(alerts, rooms) {
  const roomMap = {};
  alerts.forEach((alert) => {
    const room = getRoomName(alert.node, rooms);
    roomMap[room] = (roomMap[room] || 0) + 1;
  });
  return Object.entries(roomMap).map(([name, value]) => ({ name, value }));
}

// Helper: Severity breakdown (improved logic using level/alert_level)
function getSeverityData(alerts) {
  let Warning = 0,
    Alert = 0;
  alerts.forEach((alert) => {
    const level = (alert.level || alert.alert_level || "").toLowerCase();
    if (level === "warning") Warning++;
    else if (level === "alert") Alert++;
  });
  return [
    { name: "Warning", value: Warning },
    { name: "Alert", value: Alert },
  ];
}

// Helper: Response time (dummy, adjust if you have this data)
// (Average response time chart removed per request)

// Helper: Room comparison for bar chart
function getRoomComparisonData(alerts, rooms) {
  const roomMap = {};
  alerts.forEach((alert) => {
    const room = getRoomName(alert.node, rooms);
    if (!roomMap[room]) roomMap[room] = { room, CO: 0, Smoke: 0, Flame: 0 };
    if (alert.message?.toLowerCase().includes("co")) roomMap[room].CO++;
    if (alert.message?.toLowerCase().includes("smoke")) roomMap[room].Smoke++;
    if (alert.message?.toLowerCase().includes("flame") || alert.flame === 1)
      roomMap[room].Flame++;
  });
  return Object.values(roomMap);
}

// Helper: Recent sensor readings for area chart
function getRecentSensorData(alerts) {
  // Sort by timestamp descending, take last 10
  const sorted = [...alerts]
    .filter((a) => a.timestamp && a.temperature && a.humidity)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10)
    .reverse();
  return sorted.map((a) => {
    const rawTime = a.timestamp?.split(" ")[1] || "";
    // Convert "HH:mm:ss" to 12-hour format with am/pm, no seconds
    let formattedTime = rawTime;
    if (rawTime) {
      const [h, m] = rawTime.split(":");
      let hour = parseInt(h, 10);
      const ampm = hour >= 12 ? "pm" : "am";
      hour = hour % 12 || 12;
      formattedTime = `${hour}:${m} ${ampm}`;
    }
    return {
      time: formattedTime,
      CO: a.carbon_monoxide ?? 0,
      Smoke: a.Gas_and_Smoke ?? 0,
      Temp: a.temperature ?? 0,
      Humidity: a.humidity ?? 0,
    };
  });
}

function getRoomSeverityData(alerts, rooms) {
  const roomMap = {};
  alerts.forEach((alert) => {
    const room = getRoomName(alert.node, rooms);
    const level = (alert.level || alert.alert_level || "").toLowerCase();
    if (!roomMap[room]) roomMap[room] = { room, Warning: 0, Alert: 0 };
    if (level === "warning") roomMap[room].Warning++;
    else if (level === "alert") roomMap[room].Alert++;
  });
  return Object.values(roomMap);
}

function getSensorBreakdownData(alerts) {
  let CO = 0,
    Smoke = 0,
    Flame = 0,
    Temp = 0,
    Humidity = 0;
  alerts.forEach((alert) => {
    const msg = (alert.message || "").toLowerCase();
    if (msg.includes("co")) CO++;
    if (msg.includes("smoke") || msg.includes("gas")) Smoke++;
    if (msg.includes("flame") || alert.flame === 1) Flame++;
    if (msg.includes("temp")) Temp++;
    if (msg.includes("humidity")) Humidity++;
  });
  return [
    { name: "CO", value: CO },
    { name: "Smoke/Gas", value: Smoke },
    { name: "Flame", value: Flame },
    { name: "Temperature", value: Temp },
    { name: "Humidity", value: Humidity },
  ];
}

function getAlertTrendsData(alerts) {
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
  const result = Array.from({ length: 12 }, (_, i) => ({
    month: months[i],
    Warning: 0,
    Alert: 0,
  }));
  alerts.forEach((alert) => {
    const date = alert.timestamp
      ? new Date(alert.timestamp.replace(" ", "T"))
      : null;
    if (!date) return;
    const m = date.getMonth();
    const level = (alert.level || alert.alert_level || "").toLowerCase();
    if (level === "warning") result[m].Warning++;
    else if (level === "alert") result[m].Alert++;
  });
  return result;
}

// removed unacknowledged count helper (acknowledgement feature removed)

const REPORT_BLUE = "#2563eb";
const REPORT_RED = "#bf2d2d";
const REPORT_AMBER = "#c47d0a";
const REPORT_CYAN = "#06b6d4";
const REPORT_GREEN = "#34d399";
const REPORT_PURPLE = "#a78bfa";
const REPORT_COLORS = [
  REPORT_BLUE,
  REPORT_AMBER,
  REPORT_RED,
  REPORT_GREEN,
  REPORT_PURPLE,
];
const ANALYTICS_ALERT_LIMIT = 1000;
const ANALYTICS_FALLBACK_DELAY = 5000;
const chartMargin = { top: 4, right: 12, bottom: 0, left: -12 };
const chartTick = {
  fill: "#a1a1aa",
  fontFamily: "DM Mono, monospace",
  fontSize: 10,
};
const chartAxisLine = { stroke: "#e4e4e0" };
const chartTooltipProps = {
  contentStyle: {
    border: "1px solid #e4e4e0",
    borderRadius: 10,
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
    fontSize: 12,
  },
  itemStyle: { fontSize: 12 },
  labelStyle: { color: "#71717a", fontSize: 11 },
};
const chartLegendFormatter = (value) => (
  <span
    style={{
      color: "#71717a",
      fontFamily: "DM Mono, monospace",
      fontSize: 11,
    }}
  >
    {value}
  </span>
);
const chartLegendProps = {
  align: "center",
  formatter: chartLegendFormatter,
  height: 28,
  iconSize: 10,
  iconType: "square",
  verticalAlign: "top",
};

function ChartPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full rounded-lg bg-[#f4f4f2]"
    />
  );
}

function ChartCard({
  title,
  subtitle,
  children,
  full = false,
  tall = false,
  center = false,
  ready = true,
}) {
  return (
    <div className={`chart-card${full ? " full" : ""}`}>
      <div className="chart-title">{title}</div>
      <div className="chart-sub">{subtitle}</div>
      <div
        className={`chart-wrap${tall ? " tall" : ""}${center ? " center" : ""}`}
      >
        {ready ? children : <ChartPlaceholder />}
      </div>
    </div>
  );
}

function getRecentAlerts(data, limit = ANALYTICS_ALERT_LIMIT) {
  return Object.entries(data || {})
    .filter(([, alert]) => alert && alert.timestamp)
    .sort(
      ([, alertA], [, alertB]) =>
        String(alertB.timestamp).localeCompare(String(alertA.timestamp)),
    )
    .slice(0, limit)
    .map(([id, alert]) => ({ ...alert, id }));
}

export default function AnalyticsPage() {
  const [alerts, setAlerts] = useState([]);
  const [chartsReady, setChartsReady] = useState(false);
  const { rooms } = useRoom();

  useEffect(() => {
    const analyticsAlertsQuery = query(
      ref(db, "alerts"),
      orderByChild("timestamp"),
      limitToLast(ANALYTICS_ALERT_LIMIT),
    );
    let receivedSnapshot = false;
    let fallbackUnsub = null;

    const applyAlerts = (items) => {
      receivedSnapshot = true;
      startTransition(() => {
        setAlerts(items);
      });
    };

    const fallbackTimer = window.setTimeout(() => {
      if (receivedSnapshot) return;

      fallbackUnsub = onValue(ref(db, "alerts"), (snapshot) => {
        applyAlerts(getRecentAlerts(snapshot.val()));
      });
    }, ANALYTICS_FALLBACK_DELAY);

    const unsub = onValue(
      analyticsAlertsQuery,
      (snapshot) => {
        const arr = [];
        snapshot.forEach((childSnapshot) => {
          const alert = childSnapshot.val();
          if (alert) arr.push({ ...alert, id: childSnapshot.key });
        });

        applyAlerts(arr);
      },
      (error) => {
        console.error("Failed to load indexed reports query:", error);
        if (fallbackUnsub) return;

        fallbackUnsub = onValue(ref(db, "alerts"), (snapshot) => {
          applyAlerts(getRecentAlerts(snapshot.val()));
        });
      },
    );

    return () => {
      window.clearTimeout(fallbackTimer);
      unsub();
      if (fallbackUnsub) fallbackUnsub();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setChartsReady(true);
      return undefined;
    }

    const showCharts = () => setChartsReady(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(showCharts, { timeout: 700 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(showCharts, 120);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const {
    alertTrendsData,
    alertTypeData,
    monthlyData,
    realTimeSensorData,
    roomComparisonData,
    roomData,
    roomSeverityData,
    sensorBreakdownData,
    severityData,
  } = useMemo(() => {
    const roomLookup = new Map(rooms.map((room) => [room.nodeId, room.roomName]));

    return {
      alertTrendsData: getAlertTrendsData(alerts),
      alertTypeData: getAlertTypeData(alerts),
      monthlyData: getMonthlyData(alerts),
      realTimeSensorData: getRecentSensorData(alerts),
      roomComparisonData: getRoomComparisonData(alerts, roomLookup),
      roomData: getRoomData(alerts, roomLookup),
      roomSeverityData: getRoomSeverityData(alerts, roomLookup),
      sensorBreakdownData: getSensorBreakdownData(alerts),
      severityData: getSeverityData(alerts),
    };
  }, [alerts, rooms]);

  return (
    <div className="fg-page reports-page">
      {/* Section 1: Trends & Patterns */}
      <div>
        <div className="sec-heading">Trends & Patterns</div>
        <div className="sec-heading-sub">
          Historical analysis of alarm trends and sensor activity over time
        </div>
        <div className="sec-divider" />
        <div className="reports-grid reports-grid-spaced">
          {/* Alert Trends */}
          <ChartCard
            title="Alarm Trends"
            subtitle="Monthly alert and warning counts for 2026"
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrendsData} margin={chartMargin}>
                <CartesianGrid stroke="#f0f0ee" />
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="month"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={chartAxisLine}
                  tick={chartTick}
                  tickLine={false}
                  width={38}
                />
                <Tooltip {...chartTooltipProps} />
                <Legend {...chartLegendProps} />
                <Area
                  activeDot={{ r: 5 }}
                  type="monotone"
                  dataKey="Alert"
                  stroke={REPORT_RED}
                  strokeWidth={2}
                  fill={REPORT_RED}
                  fillOpacity={0.06}
                  dot={{ r: 3.5, fill: REPORT_RED, strokeWidth: 0 }}
                />
                <Area
                  activeDot={{ r: 5 }}
                  type="monotone"
                  dataKey="Warning"
                  stroke={REPORT_AMBER}
                  strokeWidth={2}
                  fill={REPORT_AMBER}
                  fillOpacity={0.05}
                  dot={{ r: 3.5, fill: REPORT_AMBER, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
          {/* Monthly Sensor Alerts */}
          <ChartCard
            title="Monthly Sensor Alarms"
            subtitle="CO, Flame, and Smoke activations by month"
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={chartMargin}>
                <CartesianGrid stroke="#f0f0ee" />
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="month"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={chartAxisLine}
                  tick={chartTick}
                  tickLine={false}
                  width={38}
                />
                <Tooltip {...chartTooltipProps} />
                <Legend {...chartLegendProps} />
                <Line
                  activeDot={{ r: 5 }}
                  type="monotone"
                  dataKey="CO"
                  stroke={REPORT_BLUE}
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: REPORT_BLUE, strokeWidth: 0 }}
                />
                <Line
                  activeDot={{ r: 5 }}
                  type="monotone"
                  dataKey="Flame"
                  stroke={REPORT_RED}
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: REPORT_RED, strokeWidth: 0 }}
                />
                <Line
                  activeDot={{ r: 5 }}
                  type="monotone"
                  dataKey="Smoke"
                  stroke={REPORT_AMBER}
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: REPORT_AMBER, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Section 2: Alarm Distribution */}
      <div>
        <div className="sec-heading">Alarm Distribution</div>
        <div className="sec-heading-sub">
          Breakdown of alarms by source, location, and severity level
        </div>
        <div className="sec-divider" />
        <div className="reports-grid reports-grid-spaced">
          {/* Alert Source Bar Chart */}
          <ChartCard
            title="Alarm Source Breakdown"
            subtitle="CO, Smoke, and Flame alarm counts"
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alertTypeData} margin={chartMargin}>
                <CartesianGrid stroke="#f0f0ee" />
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="name"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={chartAxisLine}
                  tick={chartTick}
                  tickLine={false}
                  width={38}
                />
                <Tooltip {...chartTooltipProps} />
                <Bar dataKey="value">
                  {alertTypeData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        entry.name === "CO"
                          ? REPORT_BLUE
                          : entry.name === "Smoke"
                            ? REPORT_AMBER
                            : REPORT_RED
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          {/* Room Distribution Pie Chart */}
          <ChartCard
            title="Room Alarm Distribution"
            subtitle="Total alarms by monitored room"
            center
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={72}
                  innerRadius={46}
                >
                  {roomData.map((entry, idx) => (
                    <Cell
                      key={entry.name}
                      fill={REPORT_COLORS[idx % REPORT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend {...chartLegendProps} />
                <Tooltip {...chartTooltipProps} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          {/* Alert Severity Breakdown */}
          <ChartCard
            title="Alarm Severity Breakdown"
            subtitle="Distribution of alerts vs warnings"
            center
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={72}
                  innerRadius={46}
                >
                  {severityData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        entry.name === "Warning"
                          ? REPORT_AMBER
                          : entry.name === "Alert"
                            ? REPORT_RED
                            : REPORT_BLUE
                      }
                    />
                  ))}
                </Pie>
                <Legend {...chartLegendProps} />
                <Tooltip {...chartTooltipProps} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          {/* Sensor Breakdown */}
          <ChartCard
            title="Sensor Breakdown"
            subtitle="Alarm count per sensor type"
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sensorBreakdownData} margin={chartMargin}>
                <CartesianGrid stroke="#f0f0ee" />
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="name"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={chartAxisLine}
                  tick={chartTick}
                  tickLine={false}
                  width={38}
                />
                <Tooltip {...chartTooltipProps} />
                <Bar dataKey="value" fill={REPORT_BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Section 3: Room Analysis */}
      <div>
        <div className="sec-heading">Room Analysis</div>
        <div className="sec-heading-sub">
          Comparative analysis of alarm patterns across different rooms
        </div>
        <div className="sec-divider" />
        <div className="reports-grid reports-grid-spaced">
          {/* Room Comparison */}
          <ChartCard
            title="Room Comparison - Total Alarms"
            subtitle="CO, Flame, and Smoke by room"
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomComparisonData} margin={chartMargin}>
                <CartesianGrid stroke="#f0f0ee" />
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="room"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={chartAxisLine}
                  tick={chartTick}
                  tickLine={false}
                  width={38}
                />
                <Tooltip {...chartTooltipProps} />
                <Legend {...chartLegendProps} />
                <Bar dataKey="CO" fill={REPORT_BLUE} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Flame" fill={REPORT_RED} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Smoke" fill={REPORT_AMBER} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          {/* Room-based Severity */}
          <ChartCard
            title="Room-based Severity"
            subtitle="Alert vs Warning count by room"
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomSeverityData} margin={chartMargin}>
                <CartesianGrid stroke="#f0f0ee" />
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="room"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={chartAxisLine}
                  tick={chartTick}
                  tickLine={false}
                  width={38}
                />
                <Tooltip {...chartTooltipProps} />
                <Legend {...chartLegendProps} />
                <Bar dataKey="Alert" stackId="a" fill={REPORT_RED} />
                <Bar dataKey="Warning" stackId="a" fill={REPORT_AMBER} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Section 4: Sensor Data */}
      <div>
        <div className="sec-heading">Sensor Data</div>
        <div className="sec-heading-sub">
          Real-time sensor readings and recent measurements
        </div>
        <div className="sec-divider" />
        <div className="reports-grid">
          {/* Real-Time Sensor Readings */}
          <ChartCard
            title="Recent Sensor Readings"
            subtitle="CO, Humidity, Smoke/Gas, and Temperature over recent readings"
            full
            tall
            ready={chartsReady}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={realTimeSensorData} margin={chartMargin}>
                <defs>
                  <linearGradient id="colorCO" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={REPORT_BLUE} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={REPORT_BLUE} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSmoke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={REPORT_AMBER} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={REPORT_AMBER} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={REPORT_RED} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={REPORT_RED} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorHumidity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={REPORT_CYAN} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={REPORT_CYAN} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  axisLine={chartAxisLine}
                  dataKey="time"
                  tick={chartTick}
                  tickLine={false}
                  tickMargin={8}
                />
                <YAxis axisLine={chartAxisLine} tick={chartTick} tickLine={false} />
                <CartesianGrid stroke="#f0f0ee" />
                <Tooltip {...chartTooltipProps} />
                <Legend {...chartLegendProps} />
                <Area
                  type="monotone"
                  dataKey="CO"
                  stroke={REPORT_BLUE}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCO)"
                  dot={{ r: 3.5, fill: REPORT_BLUE, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="Humidity"
                  stroke={REPORT_CYAN}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHumidity)"
                  dot={{ r: 3.5, fill: REPORT_CYAN, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="Smoke"
                  stroke={REPORT_AMBER}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSmoke)"
                  dot={{ r: 3.5, fill: REPORT_AMBER, strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="Temp"
                  stroke={REPORT_RED}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  dot={{ r: 3.5, fill: REPORT_RED, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
