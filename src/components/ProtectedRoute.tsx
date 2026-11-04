import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
