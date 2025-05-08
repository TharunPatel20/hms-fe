import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import LoginModal from "../../components/auth/LoginModal";

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Login;
