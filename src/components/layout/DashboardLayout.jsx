import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuthStore } from "../../store/authStore";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { role, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="h-screen grid md:grid-rows-[auto_1fr] md:grid-cols-[250px_1fr]">
  {/* Navbar (Desktop) */}
  {!isMobile && (
    <div className="bg-white shadow border-b md:col-span-2">
      <Navbar />
    </div>
  )}

  {/* Mobile Navbar */}
  {isMobile && (
    <div className="flex items-center justify-between p-4 bg-white border-b shadow md:hidden">
      <button onClick={() => setIsMobileOpen(true)} className="text-gray-700">
        <Menu size={24} />
      </button>
      <Navbar />
    </div>
  )}

  {/* Sidebar */}
  {isMobile ? (
    isMobileOpen && (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
        <div className="relative w-64 bg-white shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setIsMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <Sidebar role={role} />
        </div>
      </div>
    )
  ) : (
    <div className="hidden border-b md:block md:col-start-1 md:row-start-2 md:border-r md:border-gray-200 md:bg-white">
      <Sidebar role={role} />
    </div>
  )}

  {/* Main content */}
  <main className="overflow-y-auto md:col-start-2 dark:bg-black border-l md:row-start-2 p-4 bg-gray-50">
    <Outlet />
  </main>
</div>

  );
};

export default DashboardLayout;
