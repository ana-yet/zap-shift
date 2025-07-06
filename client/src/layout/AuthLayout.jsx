import React from "react";
import { NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import AuthImage from "../pages/Authentication/AuthImage";

const AuthLayout = () => {
  return (
    <div>
      <div className="min-h-screen bg-white font-sans">
        <div className="pt-8 pl-8">
          <NavLink to="/" className="flex items-end mb-4">
            <img
              className="h-11 w-auto"
              src={logo}
              alt="Profast Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/40x40/cccccc/ffffff?text=Error";
              }}
            />
            <span className="text-3xl font-bold text-[#303030]">Profast</span>
          </NavLink>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
            <Outlet />

            <AuthImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
