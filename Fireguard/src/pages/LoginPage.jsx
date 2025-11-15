import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import fireguardLogo from "../assets/fireguard-logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigate("/"); // Redirect to dashboard
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-[1000px] max-w-full h-[640px] rounded-3xl shadow-2xl overflow-hidden">
        {/* Left promotional panel */}
        <div className="w-1/2 bg-gradient-to-br from-violet-800 via-indigo-700 to-indigo-600 text-white p-12 relative hidden md:flex flex-col justify-between">
          <div>
            <h2 className="text-sm opacity-90">
              Monitor Your Rooms with Confidence
            </h2>
            <h1 className="text-3xl md:text-4xl font-semibold mt-6 max-w-md">
              Real-time temperature and humidity monitoring for all your spaces.
            </h1>
            <p className="mt-4 text-sm max-w-lg opacity-90">
              Get instant alerts and maintain optimal conditions effortlessly.
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium">Real-time Monitoring</div>
                <div className="text-sm opacity-90">
                  Track temperature and humidity levels across all your rooms
                  instantly
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2v6"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 12H4"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium">Smart Alerts</div>
                <div className="text-sm opacity-90">
                  Receive notifications when conditions fall outside your set
                  parameters
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3v18h18"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium">Analytics Dashboard</div>
                <div className="text-sm opacity-90">
                  View historical data and trends to optimize your environment
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
          <div className="max-w-md w-full p-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
                <img
                  src={fireguardLogo}
                  alt="Fireguard"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Login to Fireguard
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Start monitoring your rooms today
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block text-sm text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200"
              />

              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-200"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
