import { createContext, useContext, useState, type ReactNode } from "react";
import { loginUser, registrateUser } from "../api/authApi";
import { boolean } from "zod";
import type { CreateCustomUserRequest } from "@/types/api";

interface AuthContextInterface {
  accessToken: string | null;
  refreshToken: string | null;

  isAuthenticated: boolean;

  authenticateUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
  registerUser: ({
    username,
    password,
    email,
  }: CreateCustomUserRequest) => Promise<void>;
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
    } catch (error) {
      throw error;
    }
  }

  function logoutUser() {
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  async function registerUser({
    username,
    password,
    email,
  }: CreateCustomUserRequest) {
    try {
      await registrateUser({ username, password, email });

      const loginData = await loginUser({ username, password });

      setAccessToken(loginData.access);
      setRefreshToken(loginData.refresh);
    } catch (error) {
      throw error;
    }
  }

  console.log(!!accessToken);

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        isAuthenticated,
        authenticateUser,
        logoutUser,
        registerUser,
      }}
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
