import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CreateCustomUserRequest } from "@/types/api";
import {
  useLoginUser,
  useRegistrateUser,
} from "@/queries/auth/useAuthMutations";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  const { mutateAsync: loginUser } = useLoginUser();
  const { mutateAsync: registrateUser } = useRegistrateUser();

  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem("access"),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem("refresh"),
  );

  useEffect(() => {
    function syncTokens() {
      setAccessToken(localStorage.getItem("access"));
      setRefreshToken(localStorage.getItem("refresh"));
    }

    window.addEventListener("auth:sync", syncTokens);
    window.addEventListener("storage", syncTokens);

    return () => {
      window.removeEventListener("auth:sync", syncTokens);
      window.removeEventListener("storage", syncTokens);
    };
  }, []);

  async function authenticateUser(username: string, password: string) {
    const data = await loginUser({ username, password });

    setAccessToken(data.access);
    setRefreshToken(data.refresh);
  }
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function logoutUser() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccessToken(null);
    setRefreshToken(null);
    queryClient.clear();
    navigate("/");
  }

  async function registerUser({
    username,
    password,
    email,
  }: CreateCustomUserRequest) {
    await registrateUser({ username, password, email });

    const loginData = await loginUser({ username, password });

    setAccessToken(loginData.access);
    setRefreshToken(loginData.refresh);
  }

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

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth should be used within AuthProvider");
  }
  return context;
}
