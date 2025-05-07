import React from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import Navbar from "../../components/layout/Navbar"
import RegisterForm from "../../components/auth/RegisterForm"

const Register = () => {
  const { role } = useParams()

  if (!role || (role !== "doctor" && role !== "patient")) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Invalid Registration Type
            </h1>
            <p className="text-gray-600 mb-6">
              Please select a valid registration type.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register/patient"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Register as Patient
              </Link>
              <Link
                to="/register/doctor"
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Register as Doctor
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-12">
        <Link
          to="/login"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Login</span>
        </Link>

        <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {role === "doctor" ? "Doctor Registration" : "Patient Registration"}
          </h1>

          {role === "doctor" && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                <strong>Note:</strong> Doctor registrations require
                administrator approval before you can access your account.
              </p>
            </div>
          )}

          <RegisterForm role={role} />
        </div>
      </div>
    </div>
  )
}

export default Register
