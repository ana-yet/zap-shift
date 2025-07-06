import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Dashboard/Navbar/Navbar";
import Sidebar from "../pages/Dashboard/sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 lg:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="pt-16 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
