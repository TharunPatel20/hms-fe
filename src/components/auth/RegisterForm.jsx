import React from "react"
import { useParams } from "react-router-dom"
import DoctorRegistrationForm from "../forms/DoctorRegistrationForm"
import PatientRegistrationForm from "../forms/PatientRegistrationForm"

const RegisterForm = ({ role }) => {
  // fallback if role is not passed as prop
  const { userType } = useParams()
  const currentRole = role || userType

  if (currentRole === "doctor") {
    return <DoctorRegistrationForm />
  } else if (currentRole === "patient") {
    return <PatientRegistrationForm />
  } else {
    return (
      <div className="text-center text-red-600 font-semibold">
        Invalid user type.
      </div>
    )
  }
}

export default RegisterForm
