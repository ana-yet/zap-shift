import React from "react";
import { FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink } from "react-router";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const footerNavLinks = [
    { name: "Services", path: "/" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FaLinkedinIn />, href: "#", bg: "bg-blue-600" },
    { icon: <FaXTwitter />, href: "#", bg: "bg-black" },
    { icon: <FaFacebook />, href: "#", bg: "bg-blue-800" },
    { icon: <FaYoutube />, href: "#", bg: "bg-red-600" },
  ];

  return (
    <footer className="bg-black text-white rounded-t-2xl mt-10">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center gap-y-8">
          {/* Top section: Logo and Tagline */}
          <div className="flex flex-col items-center text-center">
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
              <span className="text-3xl font-bold text-white">Profast</span>
            </NavLink>
            <p className="max-w-md text-gray-400">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          {/* Middle section: Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2">
            {footerNavLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="hover:text-[#D4F045] transition-colors duration-300"
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom section: Social Icons */}
          <div className="flex items-center gap-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center h-10 w-10 rounded-full text-white ${social.bg} transition-transform hover:scale-110`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
