import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hook/useAuth";

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    userLogin(data.email, data.password)
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
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Login with Profast</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Email Input */}
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
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-500 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Password Input */}
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
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
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

        {/* Forget Password Link */}
        <div className="text-right mb-6">
          <Link
            to={"/forget-password"}
            className="text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#A4D05D] text-white font-bold py-3 rounded-lg hover:bg-lime-600 transition-colors duration-300"
        >
          Login
        </button>
      </form>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <GoogleLogin />

      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Don't have any account?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-gray-800 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
