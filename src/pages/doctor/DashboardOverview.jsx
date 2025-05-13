import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { Calendar, Users, FileText } from "lucide-react";
import Card from "../../components/common/Card";


export default function DashboardOverview({ upcomingAppointments }) {
  const { token } = useAuthStore();

  const [dashboardData, setDashboardData] = useState({
    totalPatient: 0,
    totalAppointment: 0,
    todayAppointment: 0,
    totalOnlineAppointments: 0,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:6969/api/hms/appointment/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        setError("Something went wrong.");
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Today's Appointments" className="bg-blue-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-blue-100 rounded-full">
            <Calendar size={24} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-blue-600">
              {dashboardData.todayAppointment}
            </p>
            <p className="text-sm text-gray-600">
              Next: {upcomingAppointments?.[0]?.time || "None"}
            </p>
          </div>
        </div>
      </Card>

      <Card title="Total Patients" className="bg-green-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-green-100 rounded-full">
            <Users size={24} className="text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-green-600">{dashboardData.totalPatient}</p>
            <p className="text-sm text-gray-600">Growing every day</p>
          </div>
        </div>
      </Card>

      <Card title="Total Appointments" className="bg-purple-50 border-none">
        <div className="flex items-start">
          <div className="p-3 bg-purple-100 rounded-full">
            <FileText size={24} className="text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-3xl font-bold text-purple-600">{dashboardData.totalAppointment}</p>
            <p className="text-sm text-gray-600">
              Online: {dashboardData.totalOnlineAppointments}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
