import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center bg-gray-100 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
      >
        <AiOutlineGoogle className="mr-3 text-2xl" />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
