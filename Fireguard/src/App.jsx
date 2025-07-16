import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LogsPage from "./pages/LogsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import { RoomProvider } from "./context/RoomContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AlarmModalProvider } from "./context/AlarmModalContext";
import AlarmWatcher from "./components/AlarmWatcher";
import { RoomChartModalProvider } from "./context/RoomChartModalContext";
import RoomChartModal from "./components/RoomChartModal";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <AlarmModalProvider>
        <RoomProvider>
          <NotificationProvider>
            <RoomChartModalProvider>
              <AlarmWatcher />
              <RoomChartModal />
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-0 h-screen overflow-y-auto bg-gray-50">
                  <Header />
                  <main className="flex-1 min-h-0 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/logs" element={<LogsPage />} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                      <Route path="/users" element={<UsersPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </RoomChartModalProvider>
          </NotificationProvider>
        </RoomProvider>
      </AlarmModalProvider>
    </Router>
  );
}

export default App;
