// src/context/AlarmModalContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const AlarmModalContext = createContext();

export function useAlarmModal() {
  return useContext(AlarmModalContext);
}

export function AlarmModalProvider({ children }) {
  const [modal, setModal] = useState({ open: false, message: "" });

  const showAlarm = useCallback((message) => {
    setModal({ open: true, message });
  }, []);

  const closeAlarm = useCallback(() => {
    setModal({ open: false, message: "" });
  }, []);

  return (
    <AlarmModalContext.Provider value={{ showAlarm, closeAlarm }}>
      {children}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">ALARM!</h2>
            <p className="mb-6 text-lg">{modal.message}</p>
            <button
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={closeAlarm}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </AlarmModalContext.Provider>
  );
}
