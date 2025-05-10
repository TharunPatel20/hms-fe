import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuthStore } from "../../store/authStore";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { role, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !role) {
      navigate("/login");
    }
  }, [role, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!role) {
    console.error("No role found");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-40">
        <Navbar />
      </div>

      {/* Content below the Navbar */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="w-64 h-full fixed top-16 left-0 z-30">
          <Sidebar
            role={role}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
        </div>

        {/* Main content area */}
        <main className="flex-1 ml-64 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
