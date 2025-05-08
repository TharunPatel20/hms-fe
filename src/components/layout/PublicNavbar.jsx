import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import LoginModal from "../auth/LoginModal";

const PublicNavbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
      <Link to="/blogs" className="text-gray-600 hover:text-blue-600">Blogs</Link>
      <Button onClick={() => setShowLoginModal(true)} className="text-sm">
        Login
      </Button>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default PublicNavbar;
