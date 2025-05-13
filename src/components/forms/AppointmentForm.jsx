import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { useAuthStore } from "../../store/authStore";

export default function AppointmentForm({ onLoginModalOpen }) {
  const { isAuthenticated, token } = useAuthStore();
  const navigate = useNavigate();

  const [appointmentType, setAppointmentType] = useState("in-person");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch departments
  useEffect(() => {
    axios
      .get("http://localhost:6969/api/hms/admin/department/getAllDept")
      .then((res) => setDepartments(res.data.data || []))
      .catch(() => setErrorMessage("Failed to fetch departments."));
  }, []);

  // Fetch doctors by department
  useEffect(() => {
    if (!selectedDepartment) return;
  
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`http://localhost:6969/api/hms/doctor/department/${selectedDepartment}`);
        console.log(res);
        setDoctors(res.data.data || []);
      } catch (err) {
        setErrorMessage("Failed to fetch doctors.");
      }
    };
  
    fetchDoctors();
  }, [selectedDepartment]);
  

  // Fetch time slots
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) return;
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    axios
      .get(`http://localhost:6969/api/hms/appointment/doctor/${selectedDoctor}/freeSlot/${formattedDate}`)
      .then((res) => setAvailableSlots(res.data.data || []))
      .catch(() => setErrorMessage("Failed to fetch time slots."));
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isAuthenticated) {
      onLoginModalOpen?.();
      return;
    }

    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime || !symptoms) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const [startTime] = selectedTime.split("-");
    const payload = {
      doctorUserId: selectedDoctor,
      startTime: startTime.trim(),
      appointmentDate: selectedDate,
      appointmentType: appointmentType === "in-person" ? "IN_PERSON" : "ONLINE",
      symptoms,
    };

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:6969/api/hms/appointment/take", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Appointment booked successfully!");
      setTimeout(() => navigate("/patient/appointments"), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to book appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Appointment Type */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointment Type</h2>
          <div className="grid grid-cols-2 gap-4">
            {["in-person", "online"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAppointmentType(type)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                  appointmentType === type
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {type === "in-person" ? (
                  <MapPin size={24} className={appointmentType === type ? "text-blue-600" : "text-gray-500"} />
                ) : (
                  <Calendar size={24} className={appointmentType === type ? "text-blue-600" : "text-gray-500"} />
                )}
                <span className={`mt-2 font-medium ${appointmentType === type ? "text-blue-600" : "text-gray-700"}`}>
                  {type === "in-person" ? "In-Person" : "Video Consultation"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Department, Doctor, Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.deptId} value={dept.deptId}>
                  {dept.deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.userId} value={doc.userId}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Time Slots */}
        {availableSlots.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot, idx) => {
                const label = `${slot.startTime}-${slot.endTime}`;
                return (
                  <button
                    key={idx}
                    type="button"
                    className={`py-2 px-3 rounded-md text-sm flex items-center justify-center ${
                      selectedTime === label
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedTime(label)}
                  >
                    <Clock size={12} className="mr-1" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms / Reason for Visit</label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={3}
            placeholder="Describe your symptoms..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Messages */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 text-sm flex items-center">
            <CheckCircle size={18} className="mr-2" />
            {successMessage}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isAuthenticated ? "Book Appointment" : "Login & Book"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
