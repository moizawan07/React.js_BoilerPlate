import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * - Only authenticated users can access dashboard pages
 * - If user is NOT logged in → redirect to login page
 * - If user is logged in → allow access to dashboard
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectUser);

  // Agar user null hai (logged out) → login page par bhej do
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user hai (logged in) → dashboard page show karo
  return <>{children}</>;
};
