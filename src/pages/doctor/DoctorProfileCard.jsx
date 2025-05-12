import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function DoctorProfileCard() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
    const {user} = useAuthStore();
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:6969/api/hms/doctor/${user}`
        );
        setDoctor(res.data.data);
      } catch (error) {
        setErrorMsg("Failed to fetch doctor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6 text-gray-600">
        <Loader2 className="animate-spin mr-2" />
        Loading...
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 flex items-center">
        <AlertCircle className="mr-2" />
        {errorMsg}
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl overflow-hidden p-6 space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-sm text-gray-500">{doctor.designation.replace("_", " ")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <strong>Department:</strong> {doctor.departmentName}
        </div>
        <div>
          <strong>Hospital:</strong> {doctor.medicalName}
        </div>
        <div>
          <strong>Specialization:</strong> {doctor.specialization}
        </div>
        <div>
          <strong>Experience:</strong> {doctor.yearOfExperience} years
        </div>
        <div>
          <strong>Room:</strong> #{doctor.roomNumber}
        </div>
        <div>
          <strong>Patients per Day:</strong> {doctor.noOfDailyPatient}
        </div>
        <div>
          <strong>Available Time:</strong> {doctor.startTime} - {doctor.endTime}
        </div>
        <div className="flex items-center gap-2">
          <strong>Status:</strong>{" "}
          {doctor.available ? (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle2 size={16} /> Available
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              <AlertCircle size={16} /> Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
