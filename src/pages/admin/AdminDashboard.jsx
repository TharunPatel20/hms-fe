import React, { useEffect, useState } from "react";

import { useAuthStore } from "../../store/authStore";
import AdminDashboardOverview from "./components/AdminDashboardOverview";
import Departments from "./Departments";
import PendingDoctorApprovals from "./components/PendingDoctorApprovals";
import DashboardCharts from "./components/DashboardCharts";
import axios from "axios";


const AdminDashboard = () => {
  const { token } = useAuthStore();

  const [dashboardData, setDashboardData] = useState({
    patientCount: 0,
    totalDonor: 0,
    totalDoctor: 0,
    totalDepartment: 0,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const res = await axios.get("http://localhost:6969/api/hms/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchDashboardInfo();
  }, [token]);

  return (
    <div className=" ">
      {/* Dashboard Overview */}
      <AdminDashboardOverview dashboardData={dashboardData} error={error}/>
      {/* Hospital Statistics */}
      <DashboardCharts chartData={dashboardData} loading={loading}/>
      {/* Doctor Approvals */}
      <PendingDoctorApprovals/>

      {/* Department Management */}
    
      <Departments/>
    </div>
  );
};

export default AdminDashboard;
