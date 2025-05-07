import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/layout/Navbar"
import LoginModal from "../../components/auth/LoginModal"

const Login = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true)
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsLoginModalOpen(false)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default Login
