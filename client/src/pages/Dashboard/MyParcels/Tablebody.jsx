import React from "react";
import { useNavigate } from "react-router";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi";

const Tablebody = ({ parcel, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <tr key={parcel._id} className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {parcel.parcelType}
      </td>
      <td className="px-6 py-4">{parcel.creation_date}</td>
      <td className="px-6 py-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => navigate(`/view/${parcel._id}`)}
            className="p-2 text-gray-500 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
            aria-label="View Parcel"
            title="View"
          >
            <HiEye className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/edit/${parcel._id}`)}
            className="p-2 text-gray-500 rounded-full hover:bg-green-100 hover:text-green-600 transition-colors duration-200"
            aria-label="Edit Parcel"
            title="Edit"
          >
            <HiPencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(parcel._id)}
            className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
            aria-label="Delete Parcel"
            title="Delete"
          >
            <HiTrash className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Tablebody;
