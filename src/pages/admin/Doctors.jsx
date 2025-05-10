import React from "react";
import Doctor from "./components/Doctor";
import axios from "axios";

export default function Doctors() {
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsLoading, setDoctorsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (doctorsLoading) {
          const response = await axios.get(
            "http://localhost:6969/api/hms/doctor/getAll"
          );
          console.log(response.data.data);
          setDoctors(response.data.data); // Extract the actual doctors array

          setDoctorsLoading(false);
        } else {
          console.log("Doctors already fetched");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [doctorsLoading]);

  if (doctorsLoading) {
    return <p>Loading doctors...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Registered Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Doctor key={doctor.userId} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
}
