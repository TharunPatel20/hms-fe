import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientDetails from "../patient/components/PatientDetails";
import { useAuthStore } from "../../store/authStore";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6969/api/patient/profile/get/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients(res.data.data);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
        setError("Unable to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-lg">{error}</div>
    );
  if (patients.length === 0)
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        No patients found.
      </div>
    );

  return (
    <div className="space-y-10 px-4 md:px-10 py-8">
      {patients.map((patient) => (
        <PatientDetails key={patient.userId} profile={patient} />
      ))}
    </div>
  );
}
