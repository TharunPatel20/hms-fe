import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, X, Mail, User, Stethoscope } from "lucide-react";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import { useAuthStore } from "../../../store/authStore";

const PendingDoctorApprovals = () => {
  const { token } = useAuthStore();
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:6969/api/hms/admin/pending-doctors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingDoctors(res.data || []);
    } catch (error) {
      console.error("Error fetching pending doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:6969/api/hms/admin/approve-doctor/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPendingDoctors();
    } catch (err) {
      console.error("Failed to approve doctor:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:8090/api/hms/admin/reject-doctor/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPendingDoctors();
    } catch (err) {
      console.error("Failed to reject doctor:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading pending doctors...
      </div>
    );
  }

  return (
    <div >
      <div className="mb-6 ">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Pending Doctor Approvals
        </h2>
        <p className="text-gray-500">
          Review and manage doctors awaiting approval.
        </p>
      </div>

      {pendingDoctors.length === 0 ? (
        <Card className="p-6 border border-gray-300 text-center text-gray-600">
          No pending doctor approvals at the moment.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                    <User size={16} /> {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail size={14} /> {doctor.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <Stethoscope size={14} className="inline-block mr-1" />
                    {doctor.specialization} | {doctor.degree}
                  </p>
                  <p className="text-sm text-gray-600">
                    Experience: {doctor.yearOfExperience} yrs | Patients/Day:{" "}
                    {doctor.noOfDailyPatient}
                  </p>
                  <p className="text-sm text-gray-600">
                    Department: {doctor.departmentName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Shift: {doctor.startTime} - {doctor.endTime}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                  onClick={() => handleApprove(doctor.id)}
                >
                  <CheckCircle size={16} className="mr-1" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleReject(doctor.id)}
                >
                  <X size={16} className="mr-1" />
                  Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingDoctorApprovals;
