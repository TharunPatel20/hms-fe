import React from "react";

export default function Room({ room }) {
  const isAvailable = room.available;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 border-none">
      <div className="p-6">
        <div className="flex items-start">
          <div className="p-3 bg-orange-100 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-door-closed text-orange-600"
            >
              <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
              <path d="M2 20h20"></path>
              <path d="M14 12v.01"></path>
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Room #{room.roomNumber}
            </h3>
            <p
              className={`text-3xl font-bold ${
                isAvailable ? "text-green-600" : "text-orange-600"
              }`}
            >
              {isAvailable ? "Available" : "Occupied"}
            </p>
            <p className="text-sm text-gray-600">
              Department: {room.deptName || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
