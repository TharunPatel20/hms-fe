import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import PublicNavbar from "../../pages/public/PublicNavbar";
import AdminNavbar from "../../pages/admin/AdminNavbar";
import DoctorNavbar from "../../pages/doctor/DoctorNavbar";
import PatientNavbar from "../../pages/patient/PatientNavbar";

const Navbar = () => {
  
  const { isAuthenticated, role } = useAuthStore();

  const renderNavbar = () => {
    if (!isAuthenticated) return <PublicNavbar />;
    if (role === "ADMIN") return <AdminNavbar />;
    if (role === "DOCTOR") return <DoctorNavbar />;
    if (role === "PATIENT") return <PatientNavbar />;
    else return <PublicNavbar />;
  };

  return (
    <nav>
      <div className="dark:bg-black">{renderNavbar()}</div>
    </nav>
  );
};

export default Navbar;
