// src/context/ToastContext.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AlertTriangle, Check, Info, XCircle } from "lucide-react";

const ToastContext = createContext();
const DEFAULT_TOAST_DURATION = 4000;

const toastVariants = {
  success: {
    accent: "bg-[#4b8f22]",
    iconBg: "bg-[#eef7e8]",
    iconColor: "text-[#4b8f22]",
    defaultTitle: "Success",
    icon: Check,
  },
  error: {
    accent: "bg-[#bf2d2d]",
    iconBg: "bg-[#fef2f2]",
    iconColor: "text-[#bf2d2d]",
    defaultTitle: "Error",
    icon: XCircle,
  },
  warning: {
    accent: "bg-[#c47d0a]",
    iconBg: "bg-[#fff7ed]",
    iconColor: "text-[#c47d0a]",
    defaultTitle: "Warning",
    icon: AlertTriangle,
  },
  info: {
    accent: "bg-[#2563eb]",
    iconBg: "bg-[#eff6ff]",
    iconColor: "text-[#2563eb]",
    defaultTitle: "Notice",
    icon: Info,
  },
};

function getToastVariant(type) {
  return toastVariants[type] || toastVariants.info;
}

function getToastDuration(options) {
  const duration =
    typeof options === "number" ? options : Number(options?.duration);

  return Number.isFinite(duration) && duration > 0
    ? duration
    : DEFAULT_TOAST_DURATION;
}

function getToastContent(content, type) {
  const variant = getToastVariant(type);

  if (content && typeof content === "object") {
    return {
      title: content.title || variant.defaultTitle,
      description: content.description || content.message || "",
    };
  }

  return {
    title: content || variant.defaultTitle,
    description: "",
  };
}

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());
  const nextToastIdRef = useRef(0);

  const dismissToast = useCallback((id) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (content, type = "info", options = {}) => {
      nextToastIdRef.current += 1;
      const id = nextToastIdRef.current;
      const duration = getToastDuration(options);
      const toast = {
        id,
        type,
        duration,
        ...getToastContent(content, type),
      };

      setToasts((prev) => [...prev, toast]);
      const timer = setTimeout(() => dismissToast(id), duration);
      timersRef.current.set(id, timer);
    },
    [dismissToast],
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-[100000] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col gap-2.5 sm:right-5"
      >
        {toasts.map((toast) => {
          const variant = getToastVariant(toast.type);
          const Icon = variant.icon;

          return (
            <div
              key={toast.id}
              role={toast.type === "error" ? "alert" : "status"}
              className="relative flex min-h-[58px] overflow-hidden rounded-[8px] border border-[#e7e5df] bg-white px-4 py-3 pl-5 text-[#18181b] shadow-[0_14px_32px_rgba(15,23,42,0.14)] animate-in fade-in slide-in-from-right-5"
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 ${variant.accent}`}
              />
              <span
                className={`mr-3 flex h-8 w-8 flex-none items-center justify-center rounded-[8px] ${variant.iconBg} ${variant.iconColor}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block break-words text-[13px] font-bold leading-4 tracking-normal text-[#111113]">
                  {toast.title}
                </span>
                {toast.description ? (
                  <span className="mt-1 block break-words text-xs leading-4 text-[#71717a]">
                    {toast.description}
                  </span>
                ) : null}
              </span>
              <span
                className={`toast-duration-bar absolute bottom-0 left-0 h-0.5 w-full ${variant.accent}`}
                style={{ animationDuration: `${toast.duration}ms` }}
              />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
