import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Login from "../pages/auth/login";
import ForgetPassword from "../pages/auth/forgetPassword";
import ResetPassword from "../pages/auth/resetPassword";
import Settings from "../pages/dashboard/settings";
import DashboardLayout from "../layouts/dashboard";
import DashboardHomePage from "../pages/dashboard/home";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute";

// Router function
export function Routes() {
  return useRoutes([
    //  PUBLIC ROUTES 
    {
      path: "login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "forget-password",
      element: (
        <PublicRoute>
          <ForgetPassword />
        </PublicRoute>
      ),
    },
    {
      path: "reset-password",
      element: (
        <PublicRoute>
          <ResetPassword />
        </PublicRoute>
      ),
    },

    //  PROTECTED ROUTES 
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
         </ProtectedRoute>
      ),
      children: [
        { element: <DashboardHomePage />, index: true },
        { path: "settings", element: <Settings /> },
      ],
    },

    //  FALLBACK - redirect unknown routes to home
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
}