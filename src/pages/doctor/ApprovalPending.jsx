import React from "react"
import { Link } from "react-router-dom"
import { AlertCircle, Clock, ArrowLeft } from "lucide-react"
import Navbar from "../../components/layout/Navbar"

const ApprovalPending = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock size={32} className="text-yellow-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Approval Pending
          </h1>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <div className="flex">
              <AlertCircle
                size={20}
                className="text-yellow-600 mr-2 flex-shrink-0"
              />
              <p className="text-yellow-700">
                Your registration as a doctor is pending approval from our
                administrators. This process usually takes 1-2 business days.
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            You'll receive an email notification once your account has been
            approved. After approval, you'll be able to access the doctor
            dashboard and start accepting appointments.
          </p>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">What happens next?</h3>
            <ol className="text-left text-gray-600 space-y-2 list-decimal list-inside">
              <li>
                Our administrators review your credentials and qualifications
              </li>
              <li>Once approved, you'll receive an email confirmation</li>
              <li>You can then log in to your doctor account</li>
              <li>Set up your availability and start accepting appointments</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft size={16} className="mr-1" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApprovalPending
