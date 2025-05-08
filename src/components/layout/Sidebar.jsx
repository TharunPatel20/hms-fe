import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Calendar,
  Users,
  FileText,
  CreditCard,
  MessageSquare,
  ClipboardList,
  Stethoscope,
  Building2,
  DoorClosed,
  Activity,
  CheckSquare,
  X,
  Menu,
  ArrowLeft,
  User
} from "lucide-react"


const Sidebar = ({ role, isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation()

  // Role-based sidebar links
  const sidebarLinks = {
    DOCTOR: [
      { name: "Dashboard", path: "/doctor/dashboard", icon: <Home size={20} /> },
      { name: "Upcoming Appointments", path: "/doctor/appointments", icon: <Calendar size={20} /> },
      { name: "Patient List", path: "/doctor/patients", icon: <Users size={20} /> },
      { name: "Past Appointments", path: "/doctor/past-appointments", icon: <ClipboardList size={20} /> },
      { name: "Medical Records", path: "/doctor/medical-records", icon: <FileText size={20} /> },
      { name: "Appointment Calendar", path: "/doctor/calendar", icon: <Calendar size={20} /> },
      { name: "Messages", path: "/doctor/messages", icon: <MessageSquare size={20} /> },
      { name: "My-Profile", path: "/doctor/profile", icon: <User size={20} /> },
      { name: "Sign-Out", path: "/", icon: <Home size={20} /> },

    ],
    PATIENT: [
      { name: "Dashboard", path: "/patient/dashboard", icon: <Home size={20} /> },
      { name: "Book Appointment", path: "/patient/book-appointment", icon: <Calendar size={20} /> },
      { name: "Upcoming Appointments", path: "/patient/appointments", icon: <Calendar size={20} /> },
      { name: "Past Appointments", path: "/patient/past-appointments", icon: <ClipboardList size={20} /> },
      { name: "Medical Records", path: "/patient/medical-records", icon: <FileText size={20} /> },
      { name: "Billing", path: "/patient/billing", icon: <CreditCard size={20} /> },
      { name: "Prescriptions", path: "/patient/prescriptions", icon: <ClipboardList size={20} /> },
      { name: "Messages", path: "/patient/messages", icon: <MessageSquare size={20} /> },
      { name: "My-Profile", path: "/patient/profile", icon: <User size={20} /> },
      { name: "Sign-Out", path: "/", icon: <Home size={20} /> },
    ],
    ADMIN: [
      { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
      { name: "Doctor Approvals", path: "/admin/doctor-approvals", icon: <CheckSquare size={20} /> },
      { name: "Departments", path: "/admin/departments", icon: <Building2 size={20} /> },
      { name: "Rooms", path: "/admin/rooms", icon: <DoorClosed size={20} /> },
      { name: "View Doctors", path: "/admin/doctors", icon: <Stethoscope size={20} /> },
      { name: "View Patients", path: "/admin/patients", icon: <Users size={20} /> },
      { name: "Statistics", path: "/admin/statistics", icon: <Activity size={20} /> },
      { name: "Sign-Out", path: "/", icon: <Home size={20} /> },
    ],
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar toggle button */}
      <div className="md:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white h-screen md:block fixed md:sticky top-0 left-0 w-64 border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out transform z-30 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <h2 className="text-lg font-bold flex items-center">
            <Stethoscope className="mr-2" size={20} />
            MediCare
          </h2>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileOpen(false)}
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <nav className="mt-4 px-2 overflow-y-auto h-[calc(100vh-4rem)]">
          <ul className="space-y-1">
          
            {sidebarLinks[role]?.map((item) => (
              
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition duration-150 ease-in-out ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
