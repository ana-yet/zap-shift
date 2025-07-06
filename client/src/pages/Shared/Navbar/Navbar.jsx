import React, { useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hook/useAuth";
import SignOutButton from "./SignOutButton";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navLinks = [
    { name: "Services", path: "/" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/send-parcel" },
  ];

  // Style for active NavLink
  const activeLinkStyle = {
    color: "#D4F045",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md max-w-10/12 mx-auto">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section: Logo and Brand Name */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center ">
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
              <span className="text-2xl font-bold text-[#2c2c2c]">Profast</span>
            </NavLink>
          </div>

          {/* Center Section: Navigation Links (hidden on mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                  className="text-gray-600 hover:text-[#D4F045] transition-colors duration-300 font-medium"
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to="/rider"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                className="text-gray-600 hover:text-[#D4F045] transition-colors duration-300 font-medium"
              >
                Be a Rider
              </NavLink>
            </div>
          </div>

          {/* Right Section: Action Buttons (hidden on mobile) */}
          {user ? (
            <>
              <SignOutButton />
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-x-4">
                <NavLink
                  to="/signin"
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/rider"
                  className="flex items-center gap-x-2 px-5 py-2 text-sm font-medium text-black bg-[#D4F045] rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <span>Be a rider</span>
                  <div className="bg-black text-white rounded-full p-1">
                    <FiArrowUpRight size={14} />
                  </div>
                </NavLink>
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700"
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/rider"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-gray-700"
            >
              Be a Rider
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex flex-col items-start px-5 gap-y-3">
              <NavLink
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/rider"
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center justify-center gap-x-2 px-5 py-2 text-sm font-medium text-black bg-[#D4F045] rounded-full hover:bg-opacity-90 transition-colors"
              >
                <span>Be a rider</span>
                <div className="bg-black text-white rounded-full p-1">
                  <FiArrowUpRight size={14} />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
