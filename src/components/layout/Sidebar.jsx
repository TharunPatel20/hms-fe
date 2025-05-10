import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  User,
} from "lucide-react";

const Sidebar = ({ role = "PATIENT" }) => {
  const location = useLocation();

  if (!["DOCTOR", "PATIENT", "ADMIN"].includes(role)) {
    console.error(`Invalid role: ${role}`);
    return null;
  }

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
    ],
    ADMIN: [
      { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} /> },
      { name: "Doctor Approvals", path: "/admin/doctor-approvals", icon: <CheckSquare size={20} /> },
      { name: "Departments", path: "/admin/departments", icon: <Building2 size={20} /> },
      { name: "Rooms", path: "/admin/rooms", icon: <DoorClosed size={20} /> },
      { name: "View Doctors", path: "/admin/doctors", icon: <Stethoscope size={20} /> },
      { name: "View Patients", path: "/admin/patients", icon: <Users size={20} /> },
      { name: "Statistics", path: "/admin/statistics", icon: <Activity size={20} /> },
    ],
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-full bg-white dark:bg-black border-r border-gray-200 shadow-lg px-4 py-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Menu</h2>
      <nav className="space-y-1">
        {sidebarLinks[role]?.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md transition dark:text-dark ${
              isActive(item.path)
                ? "bg-blue-100 text-blue-900  "
                : "hover:bg-blue-100 dark:text-dark dark:hover:bg-gray-800"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
    </aside>
  );
};

export default Sidebar;
