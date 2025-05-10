import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import Button from "../common/Button";
import LoginModal from "../auth/LoginModal";
import ThemeToggle from "./ThemeToggle";

const PublicNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-black border-b px-6 py-4 shadow-sm">
      {/* Left Section */}
      <h2 className="text-xl font-bold text-gray-800 flex items-center dark:text-white">
        <Stethoscope className="mr-2" size={20} />
        MediCare
      </h2>
      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-gray-900 dark:text-white hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/blogs"
          className="text-gray-900 dark:text-white hover:text-blue-600"
        >
          Blogs
        </Link>
        <Button onClick={() => setShowLoginModal(true)} className="text-sm">
          Login
        </Button>
        <ThemeToggle />

        {/* Login Modal */}
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PublicNavbar;
