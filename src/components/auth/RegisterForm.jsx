import React from "react";
import { useParams } from "react-router-dom";
import DoctorRegistrationForm from "../forms/DoctorRegistrationForm";
import PatientRegistrationForm from "../forms/PatientRegistrationForm";

const RegisterForm = ({ role }) => {
  const { role: routeRole } = useParams();
  const currentRole = role || routeRole;

  switch (currentRole) {
    case "doctor":
      return <DoctorRegistrationForm />;
    case "patient":
      return <PatientRegistrationForm />;
    default:
      return <div className="text-red-600 text-center font-semibold">Invalid user type.</div>;
  }
};

export default RegisterForm;
