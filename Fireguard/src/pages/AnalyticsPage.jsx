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
import { useRoom } from "../context/RoomContext";

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

// Helper: Map node ID to custom room name
function getRoomName(nodeId, rooms) {
  if (!nodeId) return "Unknown";
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

const COLORS = ["#2563eb", "#facc15", "#f87171", "#34d399", "#a78bfa"];

export default function AnalyticsPage() {
  const [alerts, setAlerts] = useState([]);
  const { rooms } = useRoom();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  // Helper function to set date range for quick filters
  const setQuickFilter = (filterType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (filterType) {
      case "today":
        const todayStr = today.toISOString().split("T")[0];
        setStartDate(todayStr);
        setEndDate(todayStr);
        break;
      case "week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
        setStartDate(weekStart.toISOString().split("T")[0]);
        setEndDate(weekEnd.toISOString().split("T")[0]);
        break;
      case "month":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setStartDate(monthStart.toISOString().split("T")[0]);
        setEndDate(monthEnd.toISOString().split("T")[0]);
        break;
      default:
        break;
    }
  };

  // Filter alerts by date range
  const filterAlertsByDate = (alertsList) => {
    if (!startDate && !endDate) return alertsList;
    
    return alertsList.filter((alert) => {
      if (!alert.timestamp) return false;
      const alertDate = parseTimestamp(alert.timestamp);
      if (!alertDate) return false;
      
      const alertDateOnly = new Date(alertDate.getFullYear(), alertDate.getMonth(), alertDate.getDate());
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Include the entire end date
        return alertDateOnly >= start && alertDateOnly <= end;
      } else if (startDate) {
        const start = new Date(startDate);
        return alertDateOnly >= start;
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return alertDateOnly <= end;
      }
      return true;
    });
  };

  const filteredAlerts = filterAlertsByDate(alerts);

  // Compute chart data from filtered alerts
  const monthlyData = getMonthlyData(filteredAlerts);
  const alertTypeData = getAlertTypeData(filteredAlerts);
  const roomData = getRoomData(filteredAlerts, rooms);
  const severityData = getSeverityData(filteredAlerts);
  const roomComparisonData = getRoomComparisonData(filteredAlerts, rooms);
  const realTimeSensorData = getRecentSensorData(filteredAlerts);
  const roomSeverityData = getRoomSeverityData(filteredAlerts, rooms);
  const sensorBreakdownData = getSensorBreakdownData(filteredAlerts);
  const alertTrendsData = getAlertTrendsData(filteredAlerts);

  return (
    <div className="p-4 space-y-6">
      {/* Date Filter */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-4">Filter by Date Range</h2>
        
        {/* Quick Filter Buttons and Date Inputs in One Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              onClick={() => setQuickFilter("today")}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
              Today
            </button>
            <button
              onClick={() => setQuickFilter("week")}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
              This Week
            </button>
            <button
              onClick={() => setQuickFilter("month")}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
              This Month
            </button>
          </div>

          {/* Date Inputs */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                min={startDate}
              />
            </div>
          </div>

          {/* Clear Filter Button */}
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
          >
            Clear Filter
          </button>
        </div>
        {(startDate || endDate) && (
          <p className="mt-2 text-sm text-gray-600">
            Showing {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''} 
            {startDate && endDate 
              ? ` from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`
              : startDate 
              ? ` from ${new Date(startDate).toLocaleDateString()} onwards`
              : ` up to ${new Date(endDate).toLocaleDateString()}`
            }
          </p>
        )}
      </div>

      {/* Alert Trends & Monthly Sensor Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alert Trends */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Alarm Trends</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={alertTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {/* Removed Normal line */}
              <Line
                type="monotone"
                dataKey="Warning"
                stroke="#facc15"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Alert"
                stroke="#f87171"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Monthly Sensor Alerts */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Monthly Sensor Alarms</h2>
          <ResponsiveContainer width="100%" height={220}>
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
      </div>

      {/* Alert Source Bar & Room Distribution Pie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alert Source Bar Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Alarm Source Breakdown</h2>
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
          <h2 className="text-lg font-bold mb-2">Room Alarm Distribution</h2>
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
          <h2 className="text-lg font-bold mb-2">Alarm Severity Breakdown</h2>
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
                {severityData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === "Warning"
                        ? "#facc15"
                        : entry.name === "Alert"
                        ? "#f87171"
                        : COLORS[0]
                    }
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Average Response Time chart removed per request */}
      </div>

      {/* Room Comparison & Real-Time Sensor Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Comparison */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">
            Room Comparison (Total Alarms)
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

      {/* Room-based Severity & Sensor Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room-based Severity */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Room-based Severity</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={roomSeverityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="room" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {/* Removed Normal bar */}
              <Bar dataKey="Warning" stackId="a" fill="#facc15" />
              <Bar dataKey="Alert" stackId="a" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Sensor Breakdown */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-2">Sensor Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sensorBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
