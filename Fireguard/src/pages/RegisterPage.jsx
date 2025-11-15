import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import fireguardLogo from "../assets/fireguard-logo.png";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      // set display name on auth profile
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      // create users/{uid} doc in Firestore with default role 'user'
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email || null,
        displayName: displayName || null,
        role: "user",
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-center">
      <div className="flex rounded-3xl shadow-2xl overflow-hidden w-[800px] max-w-full h-[560px]">
        {/* Left image */}
        <div className="w-1/2 h-full relative hidden md:block">
          <img
            src="https://exyq64h37op.exactdn.com/wp-content/uploads/2024/05/fire-protection-shelter-1024x683.jpg?strip=all&lossy=1&ssl=1"
            alt="Fireguard action"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "10% 50%" }}
          />
        </div>
        {/* Right form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center py-10 px-8">
          <img src={fireguardLogo} alt="Fireguard Logo" className="w-30 mb-2" />
          <h1 className="text-3xl font-bold text-red-500 mb-4 tracking-wide">
            REGISTER
          </h1>
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleRegister}
          >
            <input
              type="text"
              placeholder="Full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white font-bold py-2 rounded-lg mt-2 hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
          <div className="mt-4 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
