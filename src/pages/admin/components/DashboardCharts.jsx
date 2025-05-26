import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "../../../components/common/Card";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardCharts = ({ chartData,  loading}) => {
  
  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading charts...</p>;
  }

  if (!chartData) {
    return <p className="text-center py-10 text-red-500">No data available</p>;
  }

  const barChartData = {
    labels: ["Doctors", "Patients", "Departments", "Donors"],
    datasets: [
      {
        label: "Total Count",
        data: [
          chartData.totalDoctor,
          chartData.patientCount,
          chartData.totalDepartment,
          chartData.totalDonor,
        ],
        backgroundColor: ["#60a5fa", "#34d399", "#a78bfa", "#facc15"],
        borderRadius: 5,
      },
    ],
  };

  const pieChartData = {
    labels: ["Doctors", "Patients", "Departments", "Donors"],
    datasets: [
      {
        data: [
          chartData.totalDoctor,
          chartData.patientCount,
          chartData.totalDepartment,
          chartData.totalDonor,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#8b5cf6", "#eab308"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <Card title="Hospital Overview (Bar Chart)">
        <div className="h-64 bg-gray-50 p-4 rounded-lg">
          <Bar data={barChartData} options={options} />
        </div>
      </Card>

      <Card title="Distribution Breakdown (Pie Chart)">
        <div className="h-64 bg-gray-50 p-4 rounded-lg">
          <Pie data={pieChartData} options={options} />
        </div>
      </Card>
    </div>
  );
};

export default DashboardCharts;
