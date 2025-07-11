import React, { useState, createContext, useContext } from "react";
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
    },
    {
      path: "/settings",
      text: "Settings",
      icon: <Settings size={20} />,
      active: location.pathname === "/settings",
    },
  ];

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col bg-blue-50 border-r-blue-50 shadow-stone-300">
        <div className="p-4 pb-2 flex justify-between items-center relative">
          <img
            src={FireguardImg}
            className={`transition-all duration-300 ease-in-out ${
              expanded ? "w-20" : "w-10"
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
            {navItems.map((item) => (
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

        <div className="flex p-3">
          <img src={Occupied} alt="" className="w-7 h-7 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 ease-in-out ${
              expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={15} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="mb-1">
      <Link
        to={to}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 ease-in-out ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
      >
        <div className="min-w-[20px]">{icon}</div>
        <span
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? "w-52 ml-3 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${
              expanded ? "" : "right-1 top-2"
            }`}
          />
        )}
      </Link>
    </li>
  );
}
