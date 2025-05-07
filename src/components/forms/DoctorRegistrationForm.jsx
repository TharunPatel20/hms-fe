import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../common/Button"

const DoctorRegistrationForm = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      departmentName: "",
      medicalName: "",
      degree: "",
      designation: "",
      specialization: "",
      yearOfExperience: "",
      startTime: "",
      noOfDailyPatient: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      image: Yup.string().required("Image is required"),
      password: Yup.string().required("Password is required"),
      departmentName: Yup.string().required("Department Name is required"),
      medicalName: Yup.string().required("Medical Name is required"),
      degree: Yup.string().required("Degree is required"),
      designation: Yup.string().required("Designation is required"),
      specialization: Yup.string().required("Specialization is required"),
      yearOfExperience: Yup.number()
        .min(0, "Min experience can't be less than 0")
        .required("Year of Experience is required"),
      startTime: Yup.string().required("Start Time is required"),
      noOfDailyPatient: Yup.number()
        .min(1, "Minimum 1 patient is required")
        .required("No of daily patient is required")
    }),
    onSubmit: async values => {
      try {
        await axios.post("http://localhost:8080/api/doctors/register", values)
        navigate("/doctor/approval-pending")
      } catch (error) {
        console.error("Registration failed:", error)
        alert("Doctor registration failed. Please try again.")
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
          { label: "Image URL", name: "image", type: "text" },
          { label: "Department Name", name: "departmentName", type: "text" },
          { label: "Medical Name", name: "medicalName", type: "text" },
          { label: "Degree", name: "degree", type: "text" },
          { label: "Designation", name: "designation", type: "text" },
          { label: "Specialization", name: "specialization", type: "text" },
          {
            label: "Years of Experience",
            name: "yearOfExperience",
            type: "number"
          },
          { label: "Start Time", name: "startTime", type: "time" },
          {
            label: "No. of Daily Patients",
            name: "noOfDailyPatient",
            type: "number"
          }
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
                  ? "border-red-500"
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

      <div className="flex items-center gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={formik.isSubmitting}>
          Submit for Approval
        </Button>
      </div>
    </form>
  )
}

export default DoctorRegistrationForm
