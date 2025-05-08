import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const UserNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    switch (user?.role) {
      case "DOCTOR":
        return "/doctor/dashboard";
      case "PATIENT":
        return "/patient/dashboard";
      case "ADMIN":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2"
        >
          <span>{user?.name}</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user?.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
            alt="User"
          />
          <ChevronDown size={16} />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow text-sm z-10">
            <Link to={getDashboardLink()} className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>
              <User size={16} className="inline mr-2" /> Dashboard
            </Link>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
              <LogOut size={16} className="inline mr-2" /> Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
