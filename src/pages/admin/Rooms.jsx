import React from "react";
import Room from "./components/Room";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";

export default function Rooms() {
  const { token } = useAuthStore();
  const [rooms, setRooms] = React.useState([]);
  const [roomsLoading, setRoomsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (roomsLoading) {
          const response = await axios.get(
            "http://localhost:6969/api/hms/admin/rooms/getAll",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.data);
          setRooms(response.data.data); // Extract the actual doctors array

          setRoomsLoading(false);
        } else {
          console.log("Doctors already fetched");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [roomsLoading]);

  if (roomsLoading) {
    return <p>Loading Rooms...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Available rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Room key={room.roomNumber} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}
