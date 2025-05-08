import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import Button from "../common/Button";
import { useAuthStore } from "../../store/authStore";

const endpointMap = {
  doctor: "/api/hms/login/doctor",
  patient: "/api/patient/login",
  admin: "/api/hms/login/admin",
};

const LoginForm = ({ role, onSuccess, onBack }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (!role) {
        setError("Role is required to login.");
        return;
      }

      try {
        const endpoint = endpointMap[role];
        const response = await axios.post(`http://localhost:6969${endpoint}`, values);
        console.log(response.data.data); 
        localStorage.setItem("role", role);
        localStorage.setItem("token", response.data.data.token); // Assuming token is returned


        // Update global store or use context
        login(role, response.data.data);
        navigate(`/${role}/dashboard`);
      } catch (err) {
        console.error("Login failed:", err);
        setError("Login Failed, Invalid credentials");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          className={`w-full px-4 py-2 border ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          className={`w-full px-4 py-2 border ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-700">
          <input type="checkbox" className="mr-2" />
          Remember me
        </label>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
          Forgot password?
        </a>
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div>
        <Button
          type="submit"
          variant="primary"
          isLoading={formik.isSubmitting}
          fullWidth
          icon={<LogIn size={16} />}
        >
          Login
        </Button>
      </div>

      {/* Back button to role selection screen */}
      <div className="mt-4">
        <Button onClick={onBack} variant="outline" fullWidth>
          Back to Role Selection
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
