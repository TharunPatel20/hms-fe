import React from 'react';

export default function Department({ department }) {
  // Calculate room availability percentage
  const totalRooms = department.rooms.length;
  const availableRooms = department.rooms.filter(room => room.available).length;
  const availabilityPercent = totalRooms > 0 ? Math.round((availableRooms / totalRooms) * 100) : 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="p-2 bg-blue-100 rounded-full inline-block mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-award text-blue-600"
            >
              <circle cx="12" cy="8" r="6"></circle>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
            </svg>
          </div>
          <h3 className="font-medium text-gray-900">{department.deptName}</h3>
          <p className="text-gray-500 text-sm mt-1">{department.doctorCount || department.doctors?.length || 0} doctors</p>
          <p className="text-gray-500 text-sm">{totalRooms} rooms</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
          <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Room Availability</span>
          <span className="font-medium text-green-600">{availabilityPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${availabilityPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
