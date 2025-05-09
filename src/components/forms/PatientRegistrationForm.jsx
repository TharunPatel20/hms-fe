// import React from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useState } from "react";

const PatientRegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const bloodGroups = [
    { label: "A+", value: "A_POSITIVE" },
    { label: "A-", value: "A_NEGATIVE" },
    { label: "B+", value: "B_POSITIVE" },
    { label: "B-", value: "B_NEGATIVE" },
    { label: "AB+", value: "AB_POSITIVE" },
    { label: "AB-", value: "AB_NEGATIVE" },
    { label: "O+", value: "O_POSITIVE" },
    { label: "O-", value: "O_NEGATIVE" },
  ];

  const genders = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      imageUrl: "",
      address: "",
      mobileNo: "",
      dateOfBirth: "",
      bloodGroup: "",
      gender: "",
      interestedInBloodDonate: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      imageUrl: Yup.string().required("Image URL is required"),
      address: Yup.string().required("Address is required"),
      mobileNo: Yup.string()
        .max(10, "Mobile number must be less than 10 digits")
        .min(10, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      dateOfBirth: Yup.date().required("Date of birth is required"),
      bloodGroup: Yup.string().required("Blood group is required"),
      gender: Yup.string().required("Gender is required"),
      interestedInBloodDonate: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:6969/api/patient/register", {
          ...values,
          mobileNo: `880${values.mobileNo}`,
        });
        navigate("/login");
      } catch (error) {
        console.error("Registration failed:", error);
        // alert("Patient registration failed. Please try again.")
        const message =
          error.response?.data?.message ||
          "Patient registration failed. Please try again.";
        setError(message);
        formik.setErrors({ submit: message });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Image URL", name: "imageUrl", type: "text" },
          { label: "Mobile Number", name: "mobileNo", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "Date of Birth", name: "dateOfBirth", type: "date" },
        ].map((field) => (
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

        {/* Gender Dropdown */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border ${
              formik.touched.gender && formik.errors.gender
                ? "border-red-400"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Gender</option>
            {genders.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.gender}</p>
          )}
        </div>

        {/* Blood Group Dropdown */}
        <div>
          <label
            htmlFor="bloodGroup"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formik.values.bloodGroup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border ${
              formik.touched.bloodGroup && formik.errors.bloodGroup
                ? "border-red-400"
                : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formik.touched.bloodGroup && formik.errors.bloodGroup && (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.bloodGroup}
            </p>
          )}
        </div>

        {/* Interested in Blood Donation Checkbox */}
        <div className="flex items-center mt-4 md:mt-0">
          <input
            id="interestedInBloodDonate"
            name="interestedInBloodDonate"
            type="checkbox"
            checked={formik.values.interestedInBloodDonate}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="interestedInBloodDonate"
            className="ml-2 block text-sm text-gray-700"
          >
            Interested in Blood Donation
          </label>
        </div>
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
          Register
        </Button>
      </div>
    </form>
  );
};

export default PatientRegistrationForm;
