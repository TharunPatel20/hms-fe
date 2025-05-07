import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useAuthStore } from "./store/authStore"

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout"

// Public Pages
import HomePage from "./pages/public/HomePage"
import AppointmentPage from "./pages/public/AppointmentPage"
import BlogsPage from "./pages/public/BlogsPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard"
import ApprovalPending from "./pages/doctor/ApprovalPending"

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard"

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard"

// Protected route component
const ProtectedRoute = ({ element, allowedRoles, redirectPath = "/login" }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "doctor") {
      return <Navigate to="/doctor/dashboard" replace />
    } else if (user.role === "patient") {
      return <Navigate to="/patient/dashboard" replace />
    } else if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return <>{element}</>
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />

        {/* Doctor Routes */}
        <Route path="/doctor/approval-pending" element={<ApprovalPending />} />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute
              element={<DashboardLayout />}
              allowedRoles={["doctor"]}
            />
          }
        >
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<div>Appointments</div>} />
          <Route path="patients" element={<div>Patients</div>} />
          <Route
            path="past-appointments"
            element={<div>Past Appointments</div>}
          />
          <Route path="medical-records" element={<div>Medical Records</div>} />
          <Route path="calendar" element={<div>Calendar</div>} />
          <Route path="messages" element={<div>Messages</div>} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute
              element={<DashboardLayout />}
              allowedRoles={["patient"]}
            />
          }
        >
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route
            path="book-appointment"
            element={<div>Book Appointment</div>}
          />
          <Route path="appointments" element={<div>Appointments</div>} />
          <Route
            path="past-appointments"
            element={<div>Past Appointments</div>}
          />
          <Route path="medical-records" element={<div>Medical Records</div>} />
          <Route path="billing" element={<div>Billing</div>} />
          <Route path="prescriptions" element={<div>Prescriptions</div>} />
          <Route path="messages" element={<div>Messages</div>} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<DashboardLayout />}
              allowedRoles={["admin"]}
            />
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="doctor-approvals"
            element={<div>Doctor Approvals</div>}
          />
          <Route path="departments" element={<div>Departments</div>} />
          <Route path="rooms" element={<div>Rooms</div>} />
          <Route path="doctors" element={<div>Doctors</div>} />
          <Route path="patients" element={<div>Patients</div>} />
          <Route path="statistics" element={<div>Statistics</div>} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App