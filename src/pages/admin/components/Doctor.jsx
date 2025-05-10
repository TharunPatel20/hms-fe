import React, { useState } from "react";
import { MoreVertical } from "lucide-react"; // Optional: replace with your preferred icon set

const Doctor = ({ doctor }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white relative">
      {/* 3 Dots Icon */}
      <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
        <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-800" />
      </div>

      {/* Top: Avatar & Basic Info */}
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full object-cover mr-4"
          src={doctor.image || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt={doctor.name}
        />
        <div>
          <h3 className="font-medium text-gray-900">Dr. {doctor.name}</h3>
          <p className="text-gray-600 text-sm capitalize">{doctor.specialization}</p>
        </div>
      </div>

      {/* Experience */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user mr-2"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>{doctor.yearOfExperience}+ years experience</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{doctor.specialization}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{doctor.degree}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{doctor.designation.replace("_", " ")}</span>
      </div>

      {/* Collapsible Details */}
      {showDetails && (
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="font-medium">Department:</span>
            <span>{doctor.departmentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Hospital:</span>
            <span>{doctor.medicalName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Timing:</span>
            <span>{doctor.startTime} - {doctor.endTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Room:</span>
            <span>{doctor.roomId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Patients/day:</span>
            <span>{doctor.noOfDailyPatient}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Available:</span>
            <span className={doctor.available ? "text-green-600" : "text-red-500"}>
              {doctor.available ? "Yes" : "No"}
            </span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <button className="font-medium rounded-md transition-all duration-200 flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-700 text-base px-4 py-2 w-full">
        Book Appointment
      </button>
    </div>
  );
};

export default Doctor;
