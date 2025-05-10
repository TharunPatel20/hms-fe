import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import PublicNavbar from "./PublicNavbar";
import AdminNavbar from "../../pages/admin/AdminNavbar";
import DoctorNavbar from "../../pages/doctor/DoctorNavbar";
import PatientNavbar from "../../pages/patient/PatientNavbar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, role } = useAuthStore();

  const renderNavbar = () => {
    if (!isAuthenticated) return <PublicNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    if (role === "DOCTOR") return <DoctorNavbar />;
    if (role === "PATIENT") return <PatientNavbar />;
  };

  return (
    <nav>
      <div className="dark:bg-black">{renderNavbar()}</div>

      {/* Mobile toggle (optional) */}
      {/* <div className="sm:hidden px-4 py-2">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isOpen && <div className="mt-2">{renderNavbar()}</div>}
      </div> */}
    </nav>
  );
};

export default Navbar;
