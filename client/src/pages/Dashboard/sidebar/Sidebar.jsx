import { BiHome, BiPackage, BiX } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FaUserSecret } from "react-icons/fa";
import SidebarLink from "./SidebarLink";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const links = [
    { to: "/", icon: BiHome, text: "Dashboard" },
    { to: "/dashboard/my-parcels", icon: BiPackage, text: "Parcels" },
    { to: "/users", icon: FaUserSecret, text: "Users" },
    { to: "/settings", icon: CiSettings, text: "Settings" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
            Brand
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <BiX size={24} />
          </button>
        </div>
        <nav className="p-4">
          {links.map((link) => (
            <SidebarLink key={link.to} to={link.to} icon={link.icon}>
              {link.text}
            </SidebarLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
