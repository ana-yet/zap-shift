import { BiMenu } from "react-icons/bi";

const Navbar = ({ toggleSidebar }) => (
  <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white dark:bg-gray-800 shadow-md z-20 flex items-center px-6">
    <div className="flex items-center justify-between w-full">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-gray-600 dark:text-gray-300"
      >
        <BiMenu size={28} />
      </button>
      <div className="hidden lg:block">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>
      </div>
      <div className="flex items-center">
        <img
          src="https://placehold.co/40x40/9333ea/ffffff?text=U"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  </header>
);

export default Navbar;
