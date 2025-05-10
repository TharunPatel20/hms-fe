// src/components/admin/DoctorDetails.jsx
import React, { useState } from "react";
import { CheckCircle, X as CloseIcon, MoreVertical } from "lucide-react";

const statusRowColor = {
  APPROVED: "bg-green-50",
  REJECTED: "bg-red-50",
  PENDING: "bg-yellow-50",
};

const DoctorDetails = ({ doctors, onApprove, onReject }) => {
  const [activeActionRow, setActiveActionRow] = useState(null);

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center px-6 py-4 text-gray-500">
        No pending doctors found.
      </div>
    );
  }

  return (
    <>
      {doctors.map((doc) => (
        <tr
          key={doc.id}
          className={`hover:bg-gray-50 ${
            statusRowColor[doc.approvalStatus] || ""
          }`}
        >
          <td className="px-4 py-2 whitespace-nowrap">
            <h2
              className="w-10 h-10 rounded-full object-cover text-lg"
            >  {doc.userId}</h2>
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            <div className="font-semibold text-gray-900">{doc.name}</div>
            <div className="text-xs text-gray-500">{doc.email || "N/A"}</div>
            <div className="text-xs text-gray-500">{doc.designation}</div>
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">
            {doc.specialization}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">
            {doc.yearOfExperience} yrs
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">
            {doc.departmentName}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">
            {doc.startTime} - {doc.endTime}
          </td>
          <td className="px-4 py-2 text-sm font-semibold">
            {doc.approvalStatus}
          </td>
          <td className="px-4 py-2 text-sm">
            {doc.approvalStatus === "PENDING" ? (
              activeActionRow === doc.id ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      onApprove(doc.id);
                      setActiveActionRow(null);
                    }}
                    className="text-green-600 hover:text-green-900 flex items-center"
                  >
                    <CheckCircle size={18} className="mr-1" /> Approve
                  </button>
                  <button
                    onClick={() => {
                      onReject(doc.id);
                      setActiveActionRow(null);
                    }}
                    className="text-red-600 hover:text-red-900 flex items-center"
                  >
                    <CloseIcon size={18} className="mr-1" /> Reject
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    View Details
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    setActiveActionRow((prev) =>
                      prev === doc.id ? null : doc.id
                    )
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MoreVertical />
                </button>
              )
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default DoctorDetails;
