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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-center">
      <div className="flex rounded-3xl shadow-2xl overflow-hidden w-[800px] max-w-full h-[500px]">
        {/* Left image - use relative and absolute to fill */}
        <div className="w-1/2 h-full relative">
          <img
            src="https://exyq64h37op.exactdn.com/wp-content/uploads/2024/05/fire-protection-shelter-1024x683.jpg?strip=all&lossy=1&ssl=1"
            alt="Fireguard action"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "10% 50%" }} // Adjust these percentages as needed
          />
        </div>
        {/* Right form */}
        <div className="w-1/2 bg-white flex flex-col justify-center items-center py-10 px-8">
          <img src={fireguardLogo} alt="Fireguard Logo" className="w-30 mb-2" />
          <h1 className="text-3xl font-bold text-red-500 mb-6 tracking-wide">
            FIREGUARD
          </h1>
          <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold w-full focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
              {/* Password icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {/* You can use a lock icon from react-icons if desired */}
                <svg
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7V8a6 6 0 0 0-12 0v2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-8-2a4 4 0 0 1 8 0v2H6V8zm10 12H4v-8h16v8z" />
                </svg>
              </span>
            </div>
            <button
              type="submit"
              className="bg-gray-900 text-white font-bold py-2 rounded-lg mt-2 hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
          <button className="mt-4 text-white underline text-sm hover:text-gray-200">
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
