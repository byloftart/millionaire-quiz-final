import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

type AuthStatus = "loading" | "authenticated" | "guest";

interface AuthContextType {
  user: AuthUser | null;
  status: AuthStatus;
  refresh: () => Promise<void>;
  login: (provider: "google" | "apple") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/me");
      if (!res.ok) {
        setUser(null);
        setStatus("guest");
        return;
      }
      const data = await res.json();
      if (data?.user?.id) {
        setUser(data.user);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("guest");
      }
    } catch {
      setUser(null);
      setStatus("guest");
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback((provider: "google" | "apple") => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) {
          window.location.href = data.url;
        } else {
          window.location.href = `/api/auth/signin/${provider}`;
        }
      })
      .catch(() => {
        window.location.href = `/api/auth/signin/${provider}`;
      });
  }, []);

  const logout = useCallback(() => {
    window.location.href = "/api/auth/signout?callbackUrl=/";
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, refresh, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
