import React from "react"
import {
  CheckCircle,
  X,
  Users,
  Building2,
  DoorClosed,
  Activity,
  Award
} from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import { useAuthStore } from "../../store/authStore"

// Mock data for demonstration
const pendingDoctorApprovals = [
  {
    id: "doc1",
    name: "Dr. Robert Chen",
    specialization: "Neurology",
    experience: "10 years",
    email: "robert.chen@example.com",
    appliedDate: "2025-01-15"
  },
  {
    id: "doc2",
    name: "Dr. Amanda Williams",
    specialization: "Pediatrics",
    experience: "8 years",
    email: "amanda.williams@example.com",
    appliedDate: "2025-01-14"
  },
  {
    id: "doc3",
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    experience: "12 years",
    email: "james.wilson@example.com",
    appliedDate: "2025-01-12"
  }
]

const AdminDashboard = () => {
  const { user } = useAuthStore()
  const admin = user

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {admin?.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2" onClick={() => {}}>
            Generate Reports
          </Button>
          <Button variant="primary" onClick={() => {}}>
            System Settings
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
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
              <p className="text-3xl font-bold text-blue-600">42</p>
              <p className="text-sm text-gray-600">3 awaiting approval</p>
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
              <p className="text-3xl font-bold text-green-600">1,248</p>
              <p className="text-sm text-gray-600">+26 this week</p>
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
              <p className="text-3xl font-bold text-purple-600">12</p>
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
              <h3 className="text-lg font-semibold text-gray-800">Rooms</h3>
              <p className="text-3xl font-bold text-orange-600">86</p>
              <p className="text-sm text-gray-600">12 currently occupied</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Hospital Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Weekly Appointments">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Activity size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                Chart visualization will appear here
              </p>
            </div>
          </div>
        </Card>

        <Card title="Department Distribution">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <Activity size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">
                Chart visualization will appear here
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Doctor Approvals */}
      <Card
        title="Pending Doctor Approvals"
        actions={
          <Button variant="outline" size="sm">
            View All
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingDoctorApprovals.map(doctor => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {doctor.name}
                    </div>
                    <div className="text-gray-500 text-sm">{doctor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{doctor.specialization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{doctor.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">
                      {new Date(doctor.appliedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <CheckCircle size={18} className="mr-1" />
                        Approve
                      </button>
                      <button className="text-red-600 hover:text-red-900 flex items-center">
                        <X size={18} className="mr-1" />
                        Reject
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Department Management */}
      <Card
        title="Department Management"
        actions={
          <Button variant="primary" size="sm">
            Add Department
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="p-2 bg-blue-100 rounded-full inline-block mb-3">
                  <Award size={20} className="text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900">Cardiology</h3>
                <p className="text-gray-500 text-sm mt-1">8 doctors</p>
                <p className="text-gray-500 text-sm">12 rooms</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Room Availability</span>
                <span className="font-medium text-green-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="p-2 bg-green-100 rounded-full inline-block mb-3">
                  <Award size={20} className="text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900">Neurology</h3>
                <p className="text-gray-500 text-sm mt-1">6 doctors</p>
                <p className="text-gray-500 text-sm">8 rooms</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Room Availability</span>
                <span className="font-medium text-green-600">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="p-2 bg-purple-100 rounded-full inline-block mb-3">
                  <Award size={20} className="text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900">Pediatrics</h3>
                <p className="text-gray-500 text-sm mt-1">10 doctors</p>
                <p className="text-gray-500 text-sm">15 rooms</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Room Availability</span>
                <span className="font-medium text-yellow-600">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm">
            View All Departments
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
