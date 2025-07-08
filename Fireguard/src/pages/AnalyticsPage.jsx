import React, { useEffect, useState } from "react";
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
import { ref, onValue } from "firebase/database";

// Helper: Parse timestamp string to Date
function parseTimestamp(ts) {
  if (!ts) return null;
  // Handles both "YYYY-MM-DD HH:mm:ss" and ISO
  return new Date(ts.replace(" ", "T"));
}

// Helper: Classify alert type
function classifyAlert(alert) {
  const msg = (alert.message || "").toLowerCase();
  if (
    msg.includes("fire") ||
    msg.includes("flame") ||
    msg.includes("high temperature")
  )
    return "fire";
  if (
    msg.includes("smoke") ||
    msg.includes("gas") ||
    msg.includes("co") ||
    msg.includes("elevated temperature")
  )
    return "smoke_gas";
  return "other";
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
function getRoomData(alerts) {
  const roomMap = {};
  alerts.forEach((alert) => {
    const room = alert.node
      ? `Room ${alert.node.replace("NODE", "")}`
      : "Unknown";
    roomMap[room] = (roomMap[room] || 0) + 1;
  });
  return Object.entries(roomMap).map(([name, value]) => ({ name, value }));
}

// Helper: Severity breakdown (dummy logic, adjust as needed)
function getSeverityData(alerts) {
  let Warning = 0,
    Escalated = 0,
    Critical = 0;
  alerts.forEach((alert) => {
    if (alert.message?.toLowerCase().includes("warning")) Warning++;
    else if (alert.message?.toLowerCase().includes("critical")) Critical++;
    else Escalated++;
  });
  return [
    { name: "Warning", value: Warning },
    { name: "Escalated", value: Escalated },
    { name: "Critical", value: Critical },
  ];
}

// Helper: Response time (dummy, adjust if you have this data)
function getResponseTimeData(alerts) {
  // Here we just return dummy data for each month
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
  return months.map((month) => ({
    month,
    time: Math.random() * 2 + 3, // 3-5 min random
  }));
}

// Helper: Room comparison for bar chart
function getRoomComparisonData(alerts) {
  const roomMap = {};
  alerts.forEach((alert) => {
    const room = alert.node
      ? `Room ${alert.node.replace("NODE", "")}`
      : "Unknown";
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

const COLORS = ["#2563eb", "#facc15", "#f87171", "#34d399", "#a78bfa"];

export default function AnalyticsPage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    const unsub = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const arr = Object.entries(data).map(([id, alert]) => ({
        ...alert,
        id,
      }));
      setAlerts(arr);
    });
    return () => unsub();
  }, []);

  // Compute chart data from live alerts
  const monthlyData = getMonthlyData(alerts);
  const alertTypeData = getAlertTypeData(alerts);
  const roomData = getRoomData(alerts);
  const severityData = getSeverityData(alerts);
  const responseTimeData = getResponseTimeData(alerts);
  const roomComparisonData = getRoomComparisonData(alerts);
  const realTimeSensorData = getRecentSensorData(alerts);

  return (
    <div className="p-4 space-y-6">
      {/* Monthly Alerts Line Chart */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-2">Monthly Sensor Alerts</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="CO"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Smoke"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Flame"
              stroke="#f87171"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alert Source Bar & Room Distribution Pie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alert Source Bar Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Alert Source Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={alertTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value">
                {alertTypeData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Room Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Room Alert Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={roomData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                label
              >
                {roomData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alert Severity Breakdown */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Alert Severity Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                label
              >
                {severityData.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Average Response Time */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">
            Average Response Time (min)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#a78bfa"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Room Comparison & Real-Time Sensor Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Comparison */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">
            Room Comparison (Total Alerts)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={roomComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="room" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="CO" fill="#2563eb" />
              <Bar dataKey="Smoke" fill="#facc15" />
              <Bar dataKey="Flame" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Real-Time Sensor Readings */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Recent Sensor Readings</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={realTimeSensorData}>
              <defs>
                <linearGradient id="colorCO" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSmoke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="CO"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorCO)"
              />
              <Area
                type="monotone"
                dataKey="Smoke"
                stroke="#facc15"
                fillOpacity={1}
                fill="url(#colorSmoke)"
              />
              <Area
                type="monotone"
                dataKey="Temp"
                stroke="#f87171"
                fillOpacity={1}
                fill="url(#colorTemp)"
              />
              <Area
                type="monotone"
                dataKey="Humidity"
                stroke="#34d399"
                fillOpacity={1}
                fill="url(#colorHumidity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
