import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    // console.log(data);

    createUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
      {/* Image Upload */}
      <div className="relative w-28 h-28 mx-auto mb-6">
        <label htmlFor="imageUpload">
          <img
            src={
              preview ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full cursor-pointer border border-gray-300"
          />
          <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
            <FiUpload className="text-xl text-gray-600" />
          </div>
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          {...register("image", {
            required: true,
            onChange: (e) => handleImageChange(e),
          })}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Name */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <span className="absolute left-3 top-11 text-gray-400 text-xl">
            <AiOutlineUser />
          </span>
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 20 })}
            className="w-full pl-10 text-gray-500 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <span className="absolute left-3 top-11 text-gray-400 text-xl">
            <AiOutlineMail />
          </span>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full pl-10 pr-4 py-3 text-gray-500 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <span className="absolute left-3 top-11 text-gray-400 text-xl">
            <AiOutlineLock />
          </span>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full pl-10 pr-10 text-gray-500 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          {errors.password && (
            <span className="text-red-500">
              Password should be 6 or more character
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11 text-gray-500 text-xl"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#A4D05D] text-white font-bold py-3 rounded-lg hover:bg-lime-600 transition-colors duration-300"
        >
          Register
        </button>
      </form>
      <div className="mt-3">
        <GoogleLogin />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-gray-800 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
