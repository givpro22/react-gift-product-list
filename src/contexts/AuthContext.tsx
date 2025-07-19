import { fetchLoginApi } from "@/api/auth";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  user: userInfoType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

type userInfoType = {
  authToken: string;
  email: string;
  name: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userInfoType | null>(() => {
    const stored = sessionStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const result = await fetchLoginApi(email, password);

    sessionStorage.setItem("userInfo", JSON.stringify(result));
    setUser(result);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("userInfo");
    setUser(null);
  }, []);

  const value = useMemo(() => {
    return { user, login, logout };
  }, [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
