import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth.jsx";
import useSecureAxios from "../../../hook/useSecureAxios.jsx";
import { useNavigate } from "react-router";
import Tablebody from "./Tablebody.jsx";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels.length);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);

        console.log(res);

        await Swal.fire({
          title: "Deleted!",
          text: "Parcel has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        refetch();
      } catch (err) {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          My Parcels
        </h1>
        <div>
          <table className="w-full min-w-full text-sm text-left text-gray-600">
            {/* Table Head */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Parcel Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {parcels.map((parcel) => (
                <Tablebody
                  key={parcel._id}
                  parcel={parcel}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
