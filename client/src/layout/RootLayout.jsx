import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-10/12 mx-auto">
      <Navbar />

      <div className="mt-20">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
