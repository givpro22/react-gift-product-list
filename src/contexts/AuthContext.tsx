import { fetchLoginApi, type UserInfo } from "@/api/auth";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  user: UserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(() => {
    const stored = sessionStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });
  const [loginError, setLoginError] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await fetchLoginApi(email, password);
      sessionStorage.setItem("userInfo", JSON.stringify(result));
      setUser(result);
      setLoginError(false);
    } catch (error) {
      setLoginError(true);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("userInfo");
    setUser(null);
  }, []);

  const value = useMemo(() => {
    return { user, login, logout, loginError };
  }, [user, login, logout, loginError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
