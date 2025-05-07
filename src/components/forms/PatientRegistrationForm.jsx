import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../common/Button"

const PatientRegistrationForm = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      address: "",
      age: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      gender: Yup.string().required("Gender is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      address: Yup.string().required("Address is required"),
      age: Yup.number()
        .min(0, "Age must be positive")
        .required("Age is required")
    }),
    onSubmit: async values => {
      try {
        await axios.post("http://localhost:8080/api/patients/register", values)
        navigate("/login")
      } catch (error) {
        console.error("Registration failed:", error)
        alert("Patient registration failed. Please try again.")
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Gender", name: "gender", type: "text" },
          { label: "Phone Number", name: "phone", type: "text" },
          { label: "Address", name: "address", type: "textarea" },
          { label: "Age", name: "age", type: "number" }
        ].map(field => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border ${
                formik.touched[field.name] && formik.errors[field.name]
                  ? "border-red-400"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6 text-sm text-gray-600">
  Already registered?{" "}
  <button
    type="button"
    onClick={() => navigate("/patient/login")}
    className="text-blue-600 hover:underline"
  >
    Login here
  </button>
</div>

      <div className="flex items-center gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={formik.isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  )
}

export default PatientRegistrationForm
