import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import PatientDetails from "./components/PatientDetails";

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

  return <PatientDetails profile={profile} />;
};

export default PatientProfile;
