import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Building2, DoorClosed } from "lucide-react";
import Card from "../../../components/common/Card";
import { useAuthStore } from "../../../store/authStore";


export default function AdminDashboardOverview() {
  const { token } = useAuthStore();

  const [dashboardData, setDashboardData] = useState({
    patientCount: 0,
    totalDonor: 0,
    totalDoctor: 0,
    totalDepartment: 0,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const res = await axios.get("http://localhost:6969/api/hms/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchDashboardInfo();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-blue-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Doctors
            </h3>
            <p className="text-3xl font-bold text-blue-600">{dashboardData.totalDoctor}</p>
            <p className="text-sm text-gray-600">Includes pending approvals</p>
          </div>
        </div>
      </Card>

      <Card className="bg-green-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-green-100 rounded-full">
            <Users size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Patients
            </h3>
            <p className="text-3xl font-bold text-green-600">{dashboardData.patientCount}</p>
            <p className="text-sm text-gray-600">+Growing regularly</p>
          </div>
        </div>
      </Card>

      <Card className="bg-purple-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-purple-100 rounded-full">
            <Building2 size={24} className="text-purple-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Departments
            </h3>
            <p className="text-3xl font-bold text-purple-600">{dashboardData.totalDepartment}</p>
            <p className="text-sm text-gray-600">Across all specialties</p>
          </div>
        </div>
      </Card>

      <Card className="bg-orange-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-orange-100 rounded-full">
            <DoorClosed size={24} className="text-orange-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">Donors</h3>
            <p className="text-3xl font-bold text-orange-600">{dashboardData.totalDonor}</p>
            <p className="text-sm text-gray-600">Registered so far</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
