"use client";

import * as React from "react";
import { login as apiLogin, signup as apiSignup } from "@/lib/auth-api";
import type { SignupInput, User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (input: SignupInput) => Promise<User>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return true;
    }
    const payloadJson = atob(parts[1]);
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (typeof payload.exp === "number") {
      // payload.exp is in seconds, Date.now() is in milliseconds
      return payload.exp * 1000 <= Date.now();
    }
    return false;
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  /* eslint-disable react-hooks/set-state-in-effect -- restoring session from localStorage after mount */
  React.useEffect(() => {
    try {
      const storedToken = localStorage.getItem("devpulse_token");
      const storedUser = localStorage.getItem("devpulse_user");

      if (storedToken && storedUser) {
        if (isTokenExpired(storedToken)) {
          localStorage.removeItem("devpulse_token");
          localStorage.removeItem("devpulse_user");
          setUser(null);
          setToken(null);
        } else {
          setToken(storedToken);
          setUser(JSON.parse(storedUser) as User);
        }
      } else {
        setUser(null);
        setToken(null);
      }
    } catch {
      try {
        localStorage.removeItem("devpulse_token");
        localStorage.removeItem("devpulse_user");
      } catch {
        // ignore storage errors
      }
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const login = React.useCallback(async (email: string, password: string): Promise<User> => {
    const res = await apiLogin(email, password);
    const { token: receivedToken, user: receivedUser } = res.data;

    try {
      localStorage.setItem("devpulse_token", receivedToken);
      localStorage.setItem("devpulse_user", JSON.stringify(receivedUser));
    } catch {
      // ignore storage errors
    }

    setToken(receivedToken);
    setUser(receivedUser);
    return receivedUser;
  }, []);

  const register = React.useCallback(
    async (input: SignupInput): Promise<User> => {
      await apiSignup(input);
      return await login(input.email, input.password);
    },
    [login]
  );

  const logout = React.useCallback(() => {
    try {
      localStorage.removeItem("devpulse_token");
      localStorage.removeItem("devpulse_user");
    } catch {
      // ignore storage errors
    }
    setToken(null);
    setUser(null);
  }, []);

  const value = React.useMemo<AuthContextType>(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
