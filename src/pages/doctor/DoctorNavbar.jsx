import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/common/Button";
const DoctorNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { role, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    return "/doctor/dashboard";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{role}</h1>

        <p className="text-gray-600">Welcome back ! </p>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => {}}>
          View Calendar
        </Button>
        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 bg-green-400 hover:bg-green-500 p-3 rounded-xl text-red-600 font-bold"  
            >
              {user}
              <ChevronDown size={16} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow text-sm z-10">
                <Link
                  to={getDashboardLink()}
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setProfileOpen(false)}
                >
                  <User size={16} className="inline mr-2" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} className="inline mr-2" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorNavbar;
