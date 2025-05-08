import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated || !role) {
    return <Navigate to={redirectPath[role]} replace />;
  }

  if (!allowedRoles.includes(role)) {
    const fallbackPaths = {
      doctor: "/doctor/dashboard",
      patient: "/patient/dashboard",
      admin: "/admin/dashboard",
    };
    return <Navigate to={fallbackPaths[role] || "/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
