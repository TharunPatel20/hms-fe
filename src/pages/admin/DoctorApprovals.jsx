import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuthStore } from "../../store/authStore";
import DoctorDetails from "./components/DoctorDetails";

export default function DoctorApprovals() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchAllDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:6969/api/hms/doctor/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.data);
      setDoctors(res.data.data);
    } catch (error) {
      console.error("Failed to fetch pending doctors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:6969/api/hms/admin/approve-doctor/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Failed to approve doctor", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:6969/api/hms/admin/reject-doctor/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Failed to reject doctor", error);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <div className="dark:bg-black p-6">
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  userId
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Specialization
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Experience
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Department
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Timing
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <DoctorDetails
                doctors={doctors}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
