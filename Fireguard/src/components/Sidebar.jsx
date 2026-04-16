import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PanelLeftOpen,
  PanelLeftClose,
  MoreVertical,
  LayoutDashboard,
  BookText,
  BarChart3,
  UserCircle2,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import FireguardImg from "../assets/fireguard-logo.png";
import { useNotification } from "../context/NotificationContext";
import bgAlpha from "../assets/bg-alpha.jpg";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
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
      text: "Reports",
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
    {
      path: "/profile",
      text: "Settings",
      icon: <Settings size={20} />,
      active: location.pathname === "/profile",
      userOnly: true,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const displayLabel = user?.displayName || user?.email?.split("@")[0] || "User";
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
        <nav
          className="h-full flex flex-col border-r-blue-50 shadow-[8px_0_17px_rgba(0,0,0,0.07)] relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${bgAlpha})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="p-4 pb-2 flex justify-between items-center relative z-10">
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
            <ul className="flex-1 px-3 relative z-10">
              {navItems
                .filter((item) => {
                  if (item.adminOnly) {
                    // while loading, hide admin-only links; only show when role === 'admin'
                    return !loading && role === "admin";
                  }
                  if (item.userOnly) {
                    // Show only for non-admin users
                    return !loading && role !== "admin";
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

          <div
            className="relative z-10 px-3 pb-4"
            ref={menuRef}
          >
            {menuOpen && expanded && (
              <div className="absolute bottom-[4.6rem] left-3 right-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.24)]">
                <button
                  className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-slate-800 transition-colors hover:bg-slate-50"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  <User size={15} className="text-slate-400" />
                  <span className="text-sm font-medium leading-none">
                    Profile
                  </span>
                </button>
                <div className="mx-4 h-px bg-slate-100" />
                <button
                  className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                >
                  <LogOut size={15} />
                  <span className="text-sm font-medium leading-none">
                    Log out
                  </span>
                </button>
              </div>
            )}

            <div
              className={`flex items-center gap-3 rounded-2xl border border-white/8 bg-white/8 px-3 py-3 backdrop-blur-sm transition-all duration-300 ease-in-out ${
                expanded ? "justify-between" : "justify-center"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3 overflow-hidden">
                <div className="h-11 w-11 overflow-hidden rounded-xl border border-white/15 bg-white/15 flex items-center justify-center flex-shrink-0">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayLabel}
                      className="h-full w-full object-cover"
                    />
                  ) : user?.displayName || user?.email ? (
                    <span className="text-sm font-semibold text-white">
                      {initials}
                    </span>
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>

                <div
                  className={`min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${
                    expanded ? "w-40 opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <h4 className="truncate text-sm font-semibold text-white">
                    {displayLabel}
                  </h4>
                  <span className="block truncate text-xs text-slate-300">
                    {user?.email || ""}
                  </span>
                </div>
              </div>

              {expanded && (
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-label="Open account menu"
                >
                  <MoreVertical size={16} />
                </button>
              )}
            </div>
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
            ? "bg-white/20 text-white backdrop-blur-sm"
            : "hover:bg-white/10 text-white/80"
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
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-gray-900 text-white rounded-md shadow-lg z-10 whitespace-nowrap border border-gray-700">
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
