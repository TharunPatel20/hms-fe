import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Calendar, MapPin, Phone, Droplet } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:6969/api/patient/profile/getByUserId/${user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(res.data.data);
      } catch (error) {
        console.error("Failed to fetch patient profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;
  if (!profile)
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Profile not found
      </div>
    );

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
          <span>Blood Group: <strong className="ml-1">{profile.bloodGroup.replace("_", " ")}</strong></span>
        </div>
        <div className="flex items-center col-span-2">
          <User className="w-6 h-6 mr-3 text-blue-500" />
          <span>
            Willing to Donate Blood:
            <strong
              className={`ml-2 ${
                profile.interestedInBloodDonate ? "text-green-600" : "text-red-600"
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

export default PatientProfile;
