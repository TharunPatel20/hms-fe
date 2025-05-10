import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/common/Button";
import ThemeToggle from "../../components/layout/ThemeToggle";

const DoctorNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { role, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white border-b px-6 py-4 shadow-sm">
      {/* Left Section */}
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800">{role}</h1>
        <p className="text-sm text-gray-500">Welcome back!</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Button variant="primary" onClick={() => {}}>
          View Calendar
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg"
          >
            {user}
            <ChevronDown size={16} />
          </button>
         
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-md text-sm z-10">
              <Link
                to="/doctor/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                <User size={16} className="inline mr-2" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <LogOut size={16} className="inline mr-2" />
                Sign out
              </button>
            </div>
          )}
           
        </div>
        <ThemeToggle/>
      </div>
    </div>
  );
};

export default DoctorNavbar;
