import React from "react";
import { User, Calendar, MapPin, Phone, Droplet } from "lucide-react";

const PatientDetails = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-2xl rounded-3xl border border-gray-300">
      <div className="flex items-center gap-6 border-b pb-6 mb-6">
        <img
          src={profile.imageUrl || "https://via.placeholder.com/100"}
          alt="Patient"
          className="h-28 w-28 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h1 className="text-3xl font-bold text-blue-800">{profile.name}</h1>
          <p className="text-sm text-gray-500">User ID: {profile.userId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-800">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 mr-3 text-blue-500" />
          <span>{profile.address}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-6 h-6 mr-3 text-blue-500" />
          <span>{profile.mobileNo}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-3 text-blue-500" />
          <span>DOB: {profile.dateOfBirth}</span>
        </div>
        <div className="flex items-center">
          <Droplet className="w-6 h-6 mr-3 text-blue-500" />
          <span>
            Blood Group:{" "}
            <strong className="ml-1">
              {profile.bloodGroup.replace("_", " ")}
            </strong>
          </span>
        </div>
        <div className="flex items-center col-span-2">
          <User className="w-6 h-6 mr-3 text-blue-500" />
          <span>
            Willing to Donate Blood:
            <strong
              className={`ml-2 ${
                profile.interestedInBloodDonate
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {profile.interestedInBloodDonate ? "Yes" : "No"}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
