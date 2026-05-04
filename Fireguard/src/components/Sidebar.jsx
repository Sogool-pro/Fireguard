import React, { useState, createContext, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PanelLeftOpen,
  PanelLeftClose,
  LayoutDashboard,
  BookText,
  BarChart3,
  UserCircle2,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import fireguardLogo from "../assets/fireguard-logo.png";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { dashboardAlert, logsAlert } = useNotification();
  const { user, role, loading, signOut } = useAuth();

  const navItems = [
    {
      path: "/",
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      active: location.pathname === "/",
      alert: dashboardAlert,
      group: "Monitor",
    },
    {
      path: "/logs",
      text: "Logs",
      icon: <BookText size={20} />,
      active: location.pathname === "/logs",
      alert: logsAlert,
      group: "Monitor",
    },
    {
      path: "/analytics",
      text: "Reports",
      icon: <BarChart3 size={20} />,
      active: location.pathname === "/analytics",
      group: "Monitor",
    },
    {
      path: "/users",
      text: "Users",
      icon: <UserCircle2 size={20} />,
      active: location.pathname === "/users",
      adminOnly: true,
      group: "Admin",
    },
    {
      path: "/settings",
      text: "Settings",
      icon: <Settings size={20} />,
      active: location.pathname === "/settings",
      adminOnly: true,
      group: "Admin",
    },
    {
      path: "/profile",
      text: "Profile",
      icon: <User size={20} />,
      active: location.pathname === "/profile",
      group: "Admin",
    },
  ];

  const visibleNavItems = navItems.filter((item) => {
    if (item.adminOnly) {
      return !loading && role === "admin";
    }
    if (item.userOnly) {
      return !loading && role !== "admin";
    }
    return true;
  });

  const displayLabel =
    user?.displayName || user?.email?.split("@")[0] || "User";
  const initials = (() => {
    const name = displayLabel.trim();
    if (!name) return "U";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

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
        <nav className="relative flex h-full flex-col border-r border-[#e4e4e0] bg-white shadow-[8px_0_30px_rgba(15,23,42,0.035)]">
          <div className="relative flex items-center gap-2.5 border-b border-[#eeeeeb] px-[18px] py-5">
            <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[9px] shadow-[0_2px_8px_rgba(191,45,45,0.25)]">
              <img
                src={fireguardLogo}
                alt="FireGuard"
                className="h-full w-full object-cover"
              />
            </div>
            {expanded && (
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-normal text-[#18181b]">
                  FireGuard
                </div>
                <div className="mt-px font-mono text-micro uppercase tracking-[0.05em] text-[#a1a1aa]">
                  Fire Alarm Monitoring
                </div>
              </div>
            )}
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="absolute -right-3 top-7 flex h-7 w-7 items-center justify-center rounded-lg border border-[#e4e4e0] bg-white text-[#71717a] shadow-sm transition-colors hover:bg-[#fafaf8]"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? (
                <PanelLeftClose size={16} />
              ) : (
                <PanelLeftOpen size={16} />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="relative z-10 flex-1 px-2.5 py-5">
              {["Monitor", "Admin"].map((group) => {
                const groupItems = visibleNavItems.filter(
                  (item) => item.group === group,
                );
                if (groupItems.length === 0) return null;
                return (
                  <React.Fragment key={group}>
                    {expanded && (
                      <li className="px-2 pb-2 pt-2 font-mono text-micro font-medium uppercase tracking-[0.12em] text-[#a1a1aa] first:pt-0">
                        {group}
                      </li>
                    )}
                    {groupItems.map((item) => (
                      <SidebarItem
                        key={item.path}
                        icon={item.icon}
                        text={item.text}
                        to={item.path}
                        active={item.active}
                        alert={item.alert}
                      />
                    ))}
                  </React.Fragment>
                );
              })}
            </ul>
          </SidebarContext.Provider>

          <div className="border-t border-[#eeeeeb] p-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className={`flex w-full items-center rounded-xl transition-colors hover:bg-[#fafaf8] ${
                expanded ? "gap-2.5 p-2" : "justify-center p-1"
              }`}
            >
              <div
                className={`flex items-center ${
                  expanded
                    ? "min-w-0 gap-2.5 overflow-hidden"
                    : "justify-center"
                }`}
              >
                <div className="flex h-8 w-8 min-w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#bf2d2d] text-white">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayLabel}
                      className="h-full w-full object-cover"
                    />
                  ) : user?.displayName || user?.email ? (
                    <span className="block text-label font-semibold leading-none">
                      {initials}
                    </span>
                  ) : (
                    <User size={15} />
                  )}
                </div>

                {expanded && (
                  <div className="min-w-0 overflow-hidden text-left transition-all duration-300 ease-in-out">
                    <h4 className="truncate text-detail font-medium text-[#18181b]">
                      {displayLabel}
                    </h4>
                    <span className="block truncate text-label text-[#a1a1aa]">
                      {role
                        ? role.charAt(0).toUpperCase() + role.slice(1)
                        : user?.email || ""}
                    </span>
                  </div>
                )}
              </div>
            </button>

            {expanded && (
              <button
                className="mt-2 flex w-full items-center rounded-lg px-2.5 py-2 text-detail font-medium text-[#bf2d2d] transition-colors hover:bg-[#fef2f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fecaca]"
                onClick={signOut}
                aria-label="Logout"
              >
                <div className="flex min-w-[20px] items-center opacity-80">
                  <LogOut size={20} />
                </div>
                <span className="ml-2.5">Logout</span>
              </button>
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
        className={`relative my-px flex items-center rounded-lg px-2.5 py-2 text-detail font-medium transition-all duration-150 ${
          active
            ? "bg-[#fef2f2] text-[#bf2d2d]"
            : "text-[#71717a] hover:bg-[#fafaf8] hover:text-[#18181b]"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="min-w-[20px] opacity-80">{icon}</div>
        {/* Expanded: show text inline. Collapsed: show tooltip on hover. */}
        {expanded ? (
          <span className="ml-2.5 w-52 overflow-hidden transition-all duration-300 ease-in-out">
            {text}
          </span>
        ) : (
          hovered && (
            <span className="absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[#e4e4e0] bg-white px-3 py-1 text-[#18181b] shadow-lg">
              {text}
            </span>
          )
        )}
        {/* Alert dot: on top of icon when collapsed, at side when expanded */}
        {alert &&
          (expanded ? (
            <div className="absolute right-2 h-2 w-2 rounded-full bg-[#bf2d2d]" />
          ) : (
            <div className="absolute top-2 left-2/3 z-20 h-2 w-2 -translate-x-1/2 rounded-full bg-[#bf2d2d]" />
          ))}
      </Link>
    </li>
  );
}
