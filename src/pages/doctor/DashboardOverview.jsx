import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

export default function DashboardOverview() {
  const { token } = useAuthStore();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:6969/api/hms/appointment/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDashboardData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading || !dashboardData) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">Loading dashboard...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Today's Appointments */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 bg-blue-50 border-none">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Today's Appointments</h3>
        </div>
        <div className="p-6">
          <div className="flex items-start">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-calendar text-blue-600" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold text-blue-600">{dashboardData.todayAppointment}</p>
              <p className="text-sm text-gray-600">Next: 09:00 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Patients */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 bg-green-50 border-none">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
        </div>
        <div className="p-6">
          <div className="flex items-start">
            <div className="p-3 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-users text-green-600" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold text-green-600">{dashboardData.totalPatient}</p>
              <p className="text-sm text-gray-600">4 new this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Appointments */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 bg-purple-50 border-none">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Total Appointments</h3>
        </div>
        <div className="p-6">
          <div className="flex items-start">
            <div className="p-3 bg-purple-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-file-text text-purple-600" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-3xl font-bold text-purple-600">{dashboardData.totalAppointment}</p>
              <p className="text-sm text-gray-600">Last updated today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
