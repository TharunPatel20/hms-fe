import React, { useState } from "react";
import axios from "axios";
import { Search, User } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const FindDoctor = () => {
  const [filters, setFilters] = useState({
    department: "",
    specialization: "",
    designation: "",
    experience: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = Object.entries(filters)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const url = `http://localhost:6969/api/hms/doctor/search?${params}`;

      const res = await axios.get(url);
      setDoctors(res.data.data || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Find a Doctor">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="department"
              className="block text-sm font-medium mb-1"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              value={filters.department}
              onChange={handleChange}
              placeholder="e.g., dental"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="specialization"
              className="block text-sm font-medium mb-1"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              value={filters.specialization}
              onChange={handleChange}
              placeholder="e.g., Cardiology"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="designation"
              className="block text-sm font-medium mb-1"
            >
              Designation
            </label>
            <select
              id="designation"
              value={filters.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Any</option>
              <option value="SENIOR_CONSULTANT">Senior Consultant</option>
              <option value="PROFESSOR">Professor</option>
              <option value="ASSOCIATE_PROFESSOR">Associate Professor</option>
              <option value="JUNIOR_DOCTOR">Junior Doctor</option>
              <option value="RESIDENT">Resident</option>
              <option value="CHIEF_PHYSICIAN">Chief Physician</option>
              <option value="MEDICAL_OFFICER">Medical Officer</option>
              <option value="SURGEON">Surgeon</option>
              <option value="GENERAL_PRACTITIONER">General Practitioner</option>
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="experience"
              className="block text-sm font-medium mb-1"
            >
              Experience (Years)
            </label>
            <input
              type="number"
              id="experience"
              value={filters.experience}
              onChange={handleChange}
              placeholder="e.g., 5"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={fetchDoctors} icon={<Search size={16} />}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500">
            No doctors found.
          </div>
        )}
        {doctors.map((doc) => (
          <div
            key={doc.userId}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full object-cover mr-4"
                src={doc.image || "https://via.placeholder.com/150"}
                alt={doc.name}
              />
              <div>
                <h3 className="font-medium text-gray-900">{doc.name}</h3>
                <p className="text-gray-600 text-sm">{doc.specialization}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <User size={16} className="mr-2" />
              <span>{doc.yearOfExperience}+ years experience</span>
            </div>
            <div className="text-xs text-gray-700 mb-4 space-y-1">
              <p>
                <strong>Department:</strong> {doc.departmentName}
              </p>
              <p>
                <strong>Designation:</strong>{" "}
                {doc.designation.replace("_", " ")}
              </p>
              <p>
                <strong>Room:</strong> {doc.roomNumber}
              </p>
              <p>
                <strong>Time:</strong> {doc.startTime} - {doc.endTime}
              </p>
            </div>
            <Button variant="outline" fullWidth>
              Book Appointment
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FindDoctor;
