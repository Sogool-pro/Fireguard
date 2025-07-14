import React, { useState } from "react";
import { Bell, Search, User, Volume2, VolumeX, Bug } from "lucide-react";
import { useRoom } from "../context/RoomContext";

export default function Header() {
  const { buzzerOn, audioEnabled, rooms, testBuzzer, enableAudio } = useRoom();
  const [showDebug, setShowDebug] = useState(false);

  // Count rooms with alarms
  const alarmRooms = rooms.filter(room => {
    const thresholdAlarm =
      room.fire ||
      room.temperature > 50 ||
      room.smoke > 800 ||
      room.carbonMonoxide > 800;
    const alertLevelAlarm =
      room.alert_level && room.alert_level.toLowerCase() === "alert";
    return (thresholdAlarm || alertLevelAlarm) && room.silenced !== true;
  });

  // Simple audio test function
  const testAudioFile = () => {
    const audio = new Audio("/buzzer.mp3");
    audio.addEventListener('canplaythrough', () => {
      console.log("Audio file loaded successfully");
      audio.play().then(() => {
        console.log("Audio played successfully");
      }).catch(error => {
        console.error("Audio play failed:", error);
      });
    });
    audio.addEventListener('error', (e) => {
      console.error("Audio file error:", e);
    });
  };

  return (
    <>
      <header className="bg-white h-16 px-4 flex items-center justify-between border-b border-gray-200">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Buzzer Status */}
          <div className="flex items-center gap-2">
            {audioEnabled ? (
              <Volume2 
                size={20} 
                className={buzzerOn ? "text-red-500 animate-pulse" : "text-green-500"} 
              />
            ) : (
              <VolumeX size={20} className="text-gray-400" />
            )}
            <span className="text-sm text-gray-600">
              {audioEnabled ? (buzzerOn ? "Alarm Active" : "Audio Ready") : "Audio Disabled"}
            </span>
          </div>

          {/* Enable Audio Button */}
          {!audioEnabled && (
            <button 
              onClick={enableAudio}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              title="Enable Audio"
            >
              Enable Audio
            </button>
          )}

          {/* Test Buzzer Button */}
          <button 
            onClick={testBuzzer}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            title="Test Buzzer Sound"
          >
            Test Buzzer
          </button>

          {/* Test Audio File Button */}
          <button 
            onClick={testAudioFile}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            title="Test Audio File"
          >
            Test File
          </button>

          {/* Debug Button */}
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Debug Buzzer"
          >
            <Bug size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </button>
        </div>
      </header>

      {/* Debug Panel */}
      {showDebug && (
        <div className="fixed top-20 right-4 z-40 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-bold mb-2 text-sm">Buzzer Debug Info:</h3>
          <div className="text-xs space-y-1">
            <div>Audio Enabled: <span className={audioEnabled ? "text-green-600" : "text-red-600"}>{audioEnabled ? "Yes" : "No"}</span></div>
            <div>Buzzer On: <span className={buzzerOn ? "text-red-600" : "text-gray-600"}>{buzzerOn ? "Yes" : "No"}</span></div>
            <div>Alarm Rooms: {alarmRooms.length}</div>
            <div>Total Rooms: {rooms.length}</div>
            {alarmRooms.length > 0 && (
              <div className="mt-2">
                <div className="font-semibold">Alarm Rooms:</div>
                {alarmRooms.map((room, idx) => (
                  <div key={idx} className="ml-2 text-xs">
                    {room.roomName} - {room.alert_message || "Threshold exceeded"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
