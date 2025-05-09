import React, { useState } from "react"
import { ErrorMessage, useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from "../common/Button"

const degrees = ["MBBS", "MD", "DO", "BDS", "MS"]
const designations = [
  "SENIOR_CONSULTANT",
  "PROFESSOR",
  "ASSOCIATE_PROFESSOR",
  "JUNIOR_DOCTOR",
  "RESIDENT",
  "CHIEF_PHYSICIAN",
  "MEDICAL_OFFICER",
  "SURGEON",
  "GENERAL_PRACTITIONER"
]

const DoctorRegistrationForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null);
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
        .min(0, "Minimum experience is 0")
        .required("Experience is required"),
      startTime: Yup.string().required("Start time is required"),
      noOfDailyPatient: Yup.number()
        .min(1, "At least 1 patient per day")
        .required("Number of daily patients is required")
    }),
    onSubmit: async values => {
      try {
        const payload = {
          ...values,
          startTime: `${values.startTime}:00`
        }
        console.log("Submitting form with values:", payload);
        const response = await axios.post("http://localhost:6969/api/hms/register/doctor", payload)
        console.log("response ", response);
        if(response.status == 200) {
          navigate("/doctor/approval-pending")
          console.log("Registration successful:", response.data)
        }
        else{
          // console.error("Registration failed:", response.data)
          setError(response.data.message)
          
          formik.setErrors({ submit: response.data.message })
        }
      }  catch (error) {
        console.error("Registration failed:", error);
        const message = error.response?.data?.message || "Doctor registration failed. Please try again.";
        setError(message);
        formik.setErrors({ submit: message });
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

        {/* Degree Dropdown */}
        <div>
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Degree
          </label>
          <select
            id="degree"
            name="degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Degree</option>
            {degrees.map(degree => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
          {formik.touched.degree && formik.errors.degree && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.degree}</p>
          )}
        </div>

        {/* Designation Dropdown */}
        <div>
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Designation</option>
            {designations.map(designation => (
              <option key={designation} value={designation}>
                {designation.replace("_", " ")}
              </option>
            ))}
          </select>
          {formik.touched.designation && formik.errors.designation && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.designation}</p>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
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
