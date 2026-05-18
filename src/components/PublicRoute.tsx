import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * PublicRoute Component
 * - Only non-authenticated users can access login, forgetPassword, resetPassword
 * - If user is logged in → redirect to dashboard
 * - If user is NOT logged in → allow access to login pages
 */
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const user = useSelector(selectUser);

  // Agar user logged in hai → dashboard par bhej do
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Agar user logged out hai → login page show karo
  return <>{children}</>;
};
