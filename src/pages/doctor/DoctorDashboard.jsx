import React from "react";
import { Calendar, Clock, CheckCircle, X, Users, FileText } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useAuthStore } from "../../store/authStore";
import DoctorNavbar from "./DoctorNavbar";

// Mock data for demonstration
const upcomingAppointments = [
  {
    id: "app1",
    patientName: "Jane Doe",
    time: "09:00 AM",
    date: "2025-01-20",
    type: "online",
    status: "scheduled",
  },
  {
    id: "app2",
    patientName: "John Smith",
    time: "10:30 AM",
    date: "2025-01-20",
    type: "in-person",
    status: "scheduled",
  },
  {
    id: "app3",
    patientName: "Alice Johnson",
    time: "02:15 PM",
    date: "2025-01-20",
    type: "online",
    status: "scheduled",
  },
];

const recentPatients = [
  {
    id: "pat1",
    name: "Jane Doe",
    gender: "Female",
    age: 35,
    lastVisit: "2025-01-15",
    condition: "Hypertension",
  },
  {
    id: "pat2",
    name: "John Smith",
    gender: "Male",
    age: 42,
    lastVisit: "2025-01-12",
    condition: "Diabetes Type 2",
  },
  {
    id: "pat3",
    name: "Alice Johnson",
    gender: "Female",
    age: 28,
    lastVisit: "2025-01-10",
    condition: "Pregnancy Check-up",
  },
];

const DoctorDashboard = () => {
  const { role } = useAuthStore();
  const doctor = role;

  return (
    <>
      <div className="space-y-6 dark:bg-black">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Today's Appointments" className="bg-blue-50 border-none">
            <div className="flex items-start">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-blue-600">
                  {upcomingAppointments.length}
                </p>
                <p className="text-sm text-gray-600">
                  Next: {upcomingAppointments[0]?.time}
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
                <p className="text-3xl font-bold text-green-600">124</p>
                <p className="text-sm text-gray-600">4 new this week</p>
              </div>
            </div>
          </Card>

          <Card title="Medical Records" className="bg-purple-50 border-none">
            <div className="flex items-start">
              <div className="p-3 bg-purple-100 rounded-full">
                <FileText size={24} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-purple-600">37</p>
                <p className="text-sm text-gray-600">Last updated yesterday</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card title="Upcoming Appointments">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <span>
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <Clock size={16} className="text-gray-400 ml-4 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.type === "online"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {appointment.type === "online" ? "Online" : "In-Person"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {appointment.status === "scheduled"
                          ? "Scheduled"
                          : "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-900">
                          <CheckCircle size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <X size={18} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                View All Appointments
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Patients */}
        <Card title="Recent Patients">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender/Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.gender}, {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(patient.lastVisit).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {patient.condition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          View Records
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Add Note
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">
                View All Patients
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default DoctorDashboard;
