import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { useAuthStore } from "../../store/authStore";
import LoginModal from "../../components/auth/LoginModal";

const AppointmentPage = () => {
  const { isAuthenticated } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
const [doctors, setDoctors] = useState([]);
const [availableSlots, setAvailableSlots] = useState([]);
useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:6969/api/hms/admin/department/getAllDept");
      setDepartments(res.data.data); // Adjust if your backend sends a different structure
      console.log("Fetched departments:", departments);

    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  fetchDepartments();
}, []);

const handleDeptChange = async (e) => {
  const selectedDepartment= e.target.value;
  setSelectedDepartment(selectedDepartment);

  try {
    const res = await axios.get(
      `http://localhost:6969/api/hms/doctor/department/${selectedDepartment}`
    );
    setDoctors(res.data.data);
    console.log("Fetched doctors:", res.data.data);
  } catch (err) {
    console.error("Failed to fetch doctors", err);
  }
};

useEffect(() => {
  if (!selectedDepartment) return;

  // const fetchDoctors = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:6969/api/hms/doctor/department/${selectedDepartment}`
  //     );
  //     setDoctors(res.data.data);
  //     console.log("Fetched doctors:", response.data.data);
  //   } catch (err) {
  //     console.error("Failed to fetch doctors", err);
  //   }
  // };

  // fetchDoctors();
 
  handleDeptChange({ target: { value: selectedDepartment } });
}, [selectedDepartment]);
const token = useAuthStore((state) => state.token);
// useEffect(() => {
//   if (!selectedDoctor || !selectedDate) return;

//   const fetchAvailableSlots = async () => {
//     const token = useAuthStore((state) => state.token);
//     try {
//       const res = await axios.get(
//         `http://localhost:6969/api/hms/appointments/available-slots?doctorId=${selectedDoctor}&date=${selectedDate}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAvailableSlots(res.data);
//     } catch (err) {
//       console.error("Failed to fetch time slots", err);
//     }
//   };

//   fetchAvailableSlots();
// }, [selectedDoctor, selectedDate]);

useEffect(() => {
  if (!selectedDoctor || !selectedDate) return;
  const fetchAvailableSlots = async () => {
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

    try {
      const response = await axios.get(
        `http://localhost:6969/api/hms/appointment/doctor/${selectedDoctor}/freeSlot/${formattedDate}`
      );
      setAvailableSlots(response.data.data);
    } catch (error) {
      console.error('Failed to fetch time slots', error);
    }
  };
  fetchAvailableSlots();
}, [selectedDoctor, selectedDate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    const [startTime] = selectedTime.split("-");
      
      const payload = {
        doctorUserId: selectedDoctor, // Must be a valid Long
        startTime: startTime.trim(),    // Must be in HH:mm format
        appointmentDate: selectedDate,  // Format: YYYY-MM-DD
        appointmentType: appointmentType === "in-person" ? "IN_PERSON" : "TELEMEDICINE", // e.g., "ONLINE" or "OFFLINE"
        symptoms: symptoms              // A non-empty string
      };
    
      try {
        const response = await axios.post('http://localhost:6969/api/hms/appointment/take', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Appointment booked successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error booking appointment:", error.response?.data || error.message);
        alert("Failed to book appointment.");
      }
    // Mock submission
   
      setIsSubmitting(false);
      navigate("/patient/dashboard");
   
  };

  const timeSlots = [
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Book an Appointment
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Appointment Type Selection */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Appointment Type
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        {["in-person", "online"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${
                              appointmentType === type
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            } transition-colors`}
                            onClick={() => setAppointmentType(type)}
                          >
                            {type === "in-person" ? (
                              <MapPin
                                size={24}
                                className={
                                  appointmentType === type
                                    ? "text-blue-600"
                                    : "text-gray-500"
                                }
                              />
                            ) : (
                              <Calendar
                                size={24}
                                className={
                                  appointmentType === type
                                    ? "text-blue-600"
                                    : "text-gray-500"
                                }
                              />
                            )}
                            <span
                              className={`mt-2 font-medium ${
                                appointmentType === type
                                  ? "text-blue-600"
                                  : "text-gray-700"
                              }`}
                            >
                              {type === "in-person"
                                ? "In-Person Visit"
                                : "Video Consultation"}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {type === "in-person"
                                ? "Visit the hospital for your appointment"
                                : "Consult with doctor via video call"}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Department, Doctor, and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Department
                        </label>
                        <select
                          id="department"
                          value={selectedDepartment}
                          onChange={handleDeptChange}
                         
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">Select Department</option>
                          {Array.isArray(departments) &&departments.map((dept, index) => (
  <option key={dept.id || index} value={dept.deptId}>
    {dept.deptName}
  </option>
  ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="doctor"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Doctor
                        </label>
                        <select
                          id="doctor"
                          value={selectedDoctor}
                          onChange={(e) => setSelectedDoctor(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="">Select Doctor</option>
                          {Array.isArray(doctors) &&doctors.map((doc) => (
    <option key={doc.id} value={doc.userId}>
      {doc.name}
    </option>
  ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={16} className="text-gray-400" />
                          </div>
                          <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Time Slots
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {/* {timeSlots.map((time, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`py-2 px-3 rounded-md text-sm flex items-center justify-center ${
                              selectedTime === time
                                ? "bg-blue-100 text-blue-700 border border-blue-300"
                                : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            <Clock size={12} className="mr-1" />
                            {time}
                          </button>
                        ))} */}
                        {Array.isArray(availableSlots) && availableSlots.map((slot, index) => (
  <button
    key={index}
    type="button"
    className={`py-2 px-3 rounded-md text-sm flex items-center justify-center ${
      selectedTime === `${slot.startTime}-${slot.endTime}`
        ? "bg-blue-100 text-blue-700 border border-blue-300"
        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
    }`}
    onClick={() => setSelectedTime(`${slot.startTime}-${slot.endTime}`)}
  >
    <Clock size={12} className="mr-1" />
    {slot.startTime} - {slot.endTime}
  </button>
))}

                      </div>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <label
                        htmlFor="symptoms"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Symptoms / Reason for Visit
                      </label>
                      <textarea
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Please describe your symptoms or reason for the appointment"
                      />
                    </div>

                    {/* Login Prompt */}
                    {!isAuthenticated && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <AlertCircle
                            size={20}
                            className="text-yellow-600 mr-2 flex-shrink-0"
                          />
                          <p className="text-yellow-700 text-sm">
                            You'll need to log in or create an account to
                            complete your appointment booking.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                      >
                        {isAuthenticated
                          ? "Book Appointment"
                          : "Login & Book Appointment"}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="bg-blue-50 border-none">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Appointment Information
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <User size={18} className="text-blue-600 mr-3" />,
                        title: "Expert Doctors",
                        text: "Consult with our experienced specialists",
                      },
                      {
                        icon: (
                          <Clock size={18} className="text-blue-600 mr-3" />
                        ),
                        title: "Flexible Scheduling",
                        text: "Choose a time that works for you",
                      },
                      {
                        icon: (
                          <Calendar size={18} className="text-blue-600 mr-3" />
                        ),
                        title: "Online or In-Person",
                        text: "Select your preferred appointment type",
                      },
                    ].map(({ icon, title, text }, idx) => (
                      <div className="flex items-start" key={idx}>
                        {icon}
                        <div>
                          <p className="font-medium text-gray-700">{title}</p>
                          <p className="text-sm text-gray-600">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4 border-blue-200" />

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone size={16} className="text-blue-600 mr-2" />
                      <p className="text-gray-700">+1 (123) 456-7890</p>
                    </div>

                    <div className="flex items-center">
                      <Mail size={16} className="text-blue-600 mr-2" />
                      <p className="text-gray-700">
                        appointments@medicare.com
                      </p>
                    </div>

                    <div className="flex items-start">
                      <MapPin size={16} className="text-blue-600 mr-2 mt-1" />
                      <p className="text-gray-700">
                        123 Hospital Street
                        <br />
                        Medical District, MD 12345
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    </>
  );
};

export default AppointmentPage;
