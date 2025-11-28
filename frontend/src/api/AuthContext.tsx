"use client";
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  token: string | null;
  user: { name: string; email: string } | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  user: null,
  login: (token: string, userData: any) => {}, // CORRIGIDO
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  function login(token: string, userData: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
