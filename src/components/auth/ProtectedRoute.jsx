import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const { isAuthenticated, role } = useAuthStore();
  console.log(isAuthenticated, role)

  if (!isAuthenticated || !role) {
    return <Navigate to={redirectPath[role]} replace />;
  }

  if (!allowedRoles.includes(role)) {
    const fallbackPaths = {
      DOCTOR: "/doctor/dashboard",
      PATIENT: "/patient/dashboard",
      ADMIN: "/admin/dashboard",
    };
    return <Navigate to={fallbackPaths[role] || `/${role}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
