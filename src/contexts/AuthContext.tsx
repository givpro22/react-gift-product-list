import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => {
    return sessionStorage.getItem("user");
  });

  const login = useCallback((username: string) => {
    sessionStorage.setItem("user", username);
    setUser(username);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("user");
    setUser(null);
  }, []);

  const value = useMemo(() => {
    const username = user ? user.split("@")[0] : null;
    return { user, username, login, logout };
  }, [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
