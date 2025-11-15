import React, { useState, createContext, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  PanelLeftOpen,
  PanelLeftClose,
  MoreVertical,
  LayoutDashboard,
  BookText,
  BarChart3,
  UserCircle2,
  Settings,
} from "lucide-react";
import FireguardImg from "../assets/fireguard-logo.png";
import Occupied from "../assets/occupied.svg";
import { useNotification } from "../context/NotificationContext";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { dashboardAlert, logsAlert } = useNotification();
  const { user, role, loading } = useAuth();

  const navItems = [
    {
      path: "/",
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      active: location.pathname === "/",
      alert: dashboardAlert,
    },
    {
      path: "/logs",
      text: "Logs",
      icon: <BookText size={20} />,
      active: location.pathname === "/logs",
      alert: logsAlert,
    },
    {
      path: "/analytics",
      text: "Analytics",
      icon: <BarChart3 size={20} />,
      active: location.pathname === "/analytics",
    },
    {
      path: "/users",
      text: "Users",
      icon: <UserCircle2 size={20} />,
      active: location.pathname === "/users",
      adminOnly: true,
    },
    {
      path: "/settings",
      text: "Settings",
      icon: <Settings size={20} />,
      active: location.pathname === "/settings",
      adminOnly: true,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <>
      {/* Backdrop for mobile when sidebar is expanded */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setExpanded(false)}
          aria-hidden
        />
      )}
      <aside
        className={`h-screen transition-all duration-300 ease-in-out ${
          expanded ? "fixed inset-y-0 left-0 z-50 md:relative" : "relative"
        } ${expanded ? "w-64" : "w-20"}`}
      >
        <nav className="h-full flex flex-col bg-blue-50 border-r-blue-50 shadow-[8px_0_17px_rgba(0,0,0,0.07)]">
          <div className="p-4 pb-2 flex justify-between items-center relative">
            <img
              src={FireguardImg}
              className={`transition-all duration-300 ease-in-out ${
                expanded ? "w-50" : "w-20"
              }`}
              alt="Fireguard Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className={`transition-all duration-300 cursor-pointer ease-in-out p-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 ${
                expanded
                  ? "absolute -left-2 mt-10 ml-62"
                  : "absolute -left-2 mt-10 ml-19"
              }`}
            >
              {expanded ? (
                <PanelLeftClose size={20} className="text-white" />
              ) : (
                <PanelLeftOpen size={20} className="text-white" />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              {navItems
                .filter((item) => {
                  if (item.adminOnly) {
                    // while loading, hide admin-only links; only show when role === 'admin'
                    return !loading && role === "admin";
                  }
                  return true;
                })
                .map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    text={item.text}
                    to={item.path}
                    active={item.active}
                    alert={item.alert}
                  />
                ))}
            </ul>
          </SidebarContext.Provider>

          <div className="flex p-3 relative">
            <img src={Occupied} alt="" className="w-7 h-7 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-300 ease-in-out ${
                expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </h4>
                <span className="text-xs text-gray-600">
                  {user?.email || ""}
                </span>
              </div>
              <button
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <MoreVertical size={15} />
              </button>
            </div>
            {/* Popup menu */}
            {menuOpen && (
              <div className="absolute bottom-12 right-0 w-50 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-2 flex flex-col">
                <button
                  className="flex items-center gap-2 px-4 py-1 text-gray-800 hover:bg-gray-100 rounded"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                >
                  {/* Logout icon */}
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ icon, text, to, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  const [hovered, setHovered] = useState(false);

  return (
    <li className="mb-1">
      <Link
        to={to}
        className={`relative flex items-center py-2 px-4 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="min-w-[20px]">{icon}</div>
        {/* Expanded: show text inline. Collapsed: show tooltip on hover. */}
        {expanded ? (
          <span className="overflow-hidden transition-all duration-300 ease-in-out w-52 ml-3 opacity-100">
            {text}
          </span>
        ) : (
          hovered && (
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-md shadow-lg z-10 whitespace-nowrap border border-gray-200">
              {text}
            </span>
          )
        )}
        {/* Alert dot: on top of icon when collapsed, at side when expanded */}
        {alert &&
          (expanded ? (
            <div className="absolute right-2 w-2 h-2 rounded bg-red-500" />
          ) : (
            <div className="absolute top-2 left-2/3 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 z-20" />
          ))}
      </Link>
    </li>
  );
}
