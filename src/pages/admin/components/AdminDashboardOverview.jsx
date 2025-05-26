
import { Users, Building2, DoorClosed } from "lucide-react";
import Card from "../../../components/common/Card";



export default function AdminDashboardOverview({dashboardData}) {
  
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
