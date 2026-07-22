import { createContext, useContext, useState, type ReactNode } from "react";
import { loginUser } from "../api/authApi";

interface AuthContextInterface {
  accessToken: string | null;
  refreshToken: string | null;

  authenticateUser: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access"),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refresh"),
  );

  async function authenticateUser(username: string, password: string) {
    try {
      const data = await loginUser({ username, password });

      setAccessToken(data.access);
      setRefreshToken(data.refresh);
    } catch (error) {}
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, authenticateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth should be used within AuthProvider");
  }
  return context;
}
