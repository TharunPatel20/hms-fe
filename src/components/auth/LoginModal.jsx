import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, User, UserCheck, Users } from "lucide-react"
import Button from "../common/Button"
import LoginForm from "../forms/LoginForm"

const LoginModal = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(null)
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleRoleSelection = role => {
    setSelectedRole(role)
  }

  const handleRegister = role => {
    onClose()
    navigate(`/register/${role}`)
  }

  const handleSuccess = () => {
    onClose()
    navigate(`/${selectedRole}/dashboard`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login to MediCare
          </h2>

          {!selectedRole ? (
            <div className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Please select your role to continue
              </p>

              <button
                onClick={() => handleRoleSelection("doctor")}
                className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserCheck size={24} className="text-blue-600" />
                  </div>
                  <span className="ml-3 font-medium">Login as Doctor</span>
                </div>
                <span className="text-blue-600">→</span>
              </button>

              <button
                onClick={() => handleRoleSelection("patient")}
                className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full">
                    <User size={24} className="text-green-600" />
                  </div>
                  <span className="ml-3 font-medium">Login as Patient</span>
                </div>
                <span className="text-blue-600">→</span>
              </button>

              <button
                onClick={() => handleRoleSelection("admin")}
                className="flex items-center justify-between w-full p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users size={24} className="text-purple-600" />
                  </div>
                  <span className="ml-3 font-medium">Login as Admin</span>
                </div>
                <span className="text-blue-600">→</span>
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                <p>Don't have an account?</p>
                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={() => handleRegister("patient")}
                    variant="outline"
                    className="flex-1"
                  >
                    Register as Patient
                  </Button>
                  <Button
                    onClick={() => handleRegister("doctor")}
                    variant="outline"
                    className="flex-1"
                  >
                    Register as Doctor
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <LoginForm role={selectedRole} onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModal
