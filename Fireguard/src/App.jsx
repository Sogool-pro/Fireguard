import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import LogsPage from "./pages/LogsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { RoomProvider } from "./context/RoomContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ToastProvider } from "./context/ToastContext";
import { AlarmModalProvider } from "./context/AlarmModalContext";
import AlarmWatcher from "./components/AlarmWatcher";
import { RoomChartModalProvider } from "./context/RoomChartModalContext";
import RoomChartModal from "./components/RoomChartModal";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AlarmModalProvider>
            <RoomProvider>
              <NotificationProvider>
                <RoomChartModalProvider>
                <Routes>
                  {/* Auth routes: login, register, forgot password, and reset password (standalone pages) */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                  />
                  {/* All other routes: show sidebar and main layout */}
                  <Route
                    path="/*"
                    element={
                      <PrivateRoute>
                        <>
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
                                  <Route
                                    path="/analytics"
                                    element={<AnalyticsPage />}
                                  />
                                  <Route
                                    path="/users"
                                    element={<UsersPage />}
                                  />
                                  <Route
                                    path="/settings"
                                    element={<SettingsPage />}
                                  />
                                  <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                  />
                                </Routes>
                              </main>
                            </div>
                          </div>
                        </>
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </RoomChartModalProvider>
            </NotificationProvider>
          </RoomProvider>
        </AlarmModalProvider>
      </Router>
    </ToastProvider>
    </AuthProvider>
  );
}

export default App;
