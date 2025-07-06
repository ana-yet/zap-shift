import React from "react";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router";

const SignOutButton = () => {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut()
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 transition rounded-md"
    >
      <FiLogOut className="text-xl" />
      <span className="font-medium">Sign Out</span>
    </button>
  );
};

export default SignOutButton;
