import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/common/Button";
import ThemeToggle from "../../components/layout/ThemeToggle";

const AdminNavbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="ml-8">
        <h1 className="text-2xl font-bold text-gray-800  dark:text-white">Admin</h1>
        <p className="text-gray-600  dark:text-white">Welcome back!</p>
      </div>

      <div className="flex items-center gap-4 ">
        {/* <Button variant="primary">System Settings</Button> */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            {user}
            <ChevronDown size={16} />
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-black rounded-md shadow text-sm z-10 ">
              {/* <Link
                to="/admin/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setProfileOpen(false)}
              >
                <User size={16} className="inline mr-2" /> Dashboard
              </Link> */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                <LogOut size={16} className="inline mr-2" /> Sign out
              </button>
            </div>
          )}
        </div>
        <ThemeToggle/>
      </div>
    </div>
  );
};

export default AdminNavbar;
