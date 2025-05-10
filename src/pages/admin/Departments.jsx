import React from "react";

import Department from "./components/Department";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";

export default function Departments() {
  const { token } = useAuthStore();
  const [departments, setDepartments] = React.useState([]);
  const [departmentsLoading, setDepartmentsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (departmentsLoading) {
          const response = await axios.get(
            "http://localhost:6969/api/hms/admin/department/getAllDept",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDepartments(response.data.data);
          setDepartmentsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [departmentsLoading]);

  if (departmentsLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading departments...</p>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      
      <div className="p-6 sm:p-10 dark:bg-black">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8  dark:text-white">
          Available Departments
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {departments.map((department) => (
            <Department key={department.deptId} department={department} />
          ))}
        </div>
      </div>
    </div>
  );
}
