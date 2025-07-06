import { NavLink } from "react-router";

const SidebarLink = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      }`
    }
  >
    <Icon className="w-6 h-6 mr-4" />
    <span className="font-medium">{children}</span>
  </NavLink>
);

export default SidebarLink;
