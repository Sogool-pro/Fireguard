import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = window.reactRouterNavigate || null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    if (navigate) {
      navigate("/login");
    } else {
      window.location.hash = "#/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
