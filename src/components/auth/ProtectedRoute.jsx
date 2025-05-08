import { Navigate, Outlet } from "react-router-dom"
import  {useAuthStore}  from "../../store/authStore"

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) return <Navigate to={redirectPath} replace />

  if (!allowedRoles.includes(user?.role)) {
    const roleRedirectMap = {
      doctor: "/doctor/dashboard",
      patient: "/patient/dashboard",
      admin: "/admin/dashboard",
    }
    return <Navigate to={roleRedirectMap[user?.role] || "/"} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
