import React from "react"
import {
  Calendar,
  Clock,
  FileText,
  CreditCard,
  MessageSquare,
  User,
  Search
} from "lucide-react"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import { useAuthStore } from "../../store/authStore"

// Mock data for demonstration
const upcomingAppointments = [
  {
    id: "app1",
    doctorName: "Dr. John Smith",
    specialization: "Cardiology",
    time: "09:00 AM",
    date: "2025-01-25",
    type: "online",
    status: "scheduled"
  },
  {
    id: "app2",
    doctorName: "Dr. Emily Johnson",
    specialization: "Dermatology",
    time: "02:30 PM",
    date: "2025-01-28",
    type: "in-person",
    status: "scheduled"
  }
]

const recentPrescriptions = [
  {
    id: "presc1",
    doctorName: "Dr. John Smith",
    date: "2025-01-15",
    medications: ["Lisinopril 10mg", "Aspirin 81mg"]
  },
  {
    id: "presc2",
    doctorName: "Dr. Sarah Williams",
    date: "2024-12-20",
    medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"]
  }
]

const PatientDashboard = () => {
  const { user } = useAuthStore()
  const patient = user

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Patient Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {patient?.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" onClick={() => {}}>
            Book New Appointment
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-none">
          <div className="flex items-start">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming</h3>
              <p className="text-3xl font-bold text-blue-600">
                {upcomingAppointments.length}
              </p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>
        </Card>

        <Card className="bg-green-50 border-none">
          <div className="flex items-start">
            <div className="p-3 bg-green-100 rounded-full">
              <FileText size={24} className="text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Medical</h3>
              <p className="text-3xl font-bold text-green-600">8</p>
              <p className="text-sm text-gray-600">Records</p>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-50 border-none">
          <div className="flex items-start">
            <div className="p-3 bg-purple-100 rounded-full">
              <CreditCard size={24} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Bills</h3>
              <p className="text-3xl font-bold text-purple-600">2</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="bg-orange-50 border-none">
          <div className="flex items-start">
            <div className="p-3 bg-orange-100 rounded-full">
              <MessageSquare size={24} className="text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
              <p className="text-3xl font-bold text-orange-600">3</p>
              <p className="text-sm text-gray-600">Unread</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Find a Doctor */}
      <Card title="Find a Doctor">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="specialty"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Specialty
              </label>
              <select
                id="specialty"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatry">Psychiatry</option>
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="appointment-type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Appointment Type
              </label>
              <select
                id="appointment-type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Type</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="primary" icon={<Search size={16} />}>
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover mr-4"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Doctor"
              />
              <div>
                <h3 className="font-medium text-gray-900">Dr. John Smith</h3>
                <p className="text-gray-600 text-sm">Cardiology</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <User size={16} className="mr-2" />
              <span>15+ years experience</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Heart Disease
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Hypertension
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Cardiac Surgery
              </span>
            </div>
            <Button variant="outline" fullWidth>
              Book Appointment
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover mr-4"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Doctor"
              />
              <div>
                <h3 className="font-medium text-gray-900">Dr. Emily Johnson</h3>
                <p className="text-gray-600 text-sm">Dermatology</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <User size={16} className="mr-2" />
              <span>8+ years experience</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Acne
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Eczema
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Skin Cancer
              </span>
            </div>
            <Button variant="outline" fullWidth>
              Book Appointment
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover mr-4"
                src="https://randomuser.me/api/portraits/men/86.jpg"
                alt="Doctor"
              />
              <div>
                <h3 className="font-medium text-gray-900">Dr. Michael Chen</h3>
                <p className="text-gray-600 text-sm">Neurology</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <User size={16} className="mr-2" />
              <span>12+ years experience</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Headaches
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Epilepsy
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Stroke
              </span>
            </div>
            <Button variant="outline" fullWidth>
              Book Appointment
            </Button>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm">
            View All Doctors
          </Button>
        </div>
      </Card>

      {/* Upcoming Appointments */}
      <Card title="Upcoming Appointments">
        <div className="space-y-4">
          {upcomingAppointments.map(appointment => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Calendar size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {appointment.doctorName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {appointment.specialization}
                    </p>
                    <div className="flex items-center mt-2 text-gray-500 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span className="mr-3">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      <Clock size={14} className="mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.type === "online"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {appointment.type === "online" ? "Online" : "In-Person"}
                  </span>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  {appointment.type === "online" && (
                    <Button variant="primary" size="sm">
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              View All Appointments
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Prescriptions */}
      <Card title="Recent Prescriptions">
        <div className="space-y-4">
          {recentPrescriptions.map(prescription => (
            <div
              key={prescription.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {prescription.doctorName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(prescription.date).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 font-medium">
                      Medications:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                      {prescription.medications.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              View All Prescriptions
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PatientDashboard
