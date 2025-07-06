import React from "react";
// Make sure to install react-icons: npm install react-icons
import { FaSearch } from "react-icons/fa";

const Search = ({ handleSearch }) => {
  return (
    // Main container to center the component on the page
    <div className="flex items-center justify-center ">
      {/* The card component */}
      <div className="w-full">
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-16 lg:p-20">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-8">
            We are available in 64 districts
          </h1>

          {/* Search form container */}
          <form
            className="flex flex-col sm:flex-row items-center w-full max-w-2xl"
            onSubmit={handleSearch}
          >
            {/* Input field with icon */}
            <div className="relative flex-grow w-full mb-3 sm:mb-0">
              <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                {/* Replaced the SVG with an icon from react-icons */}
                <FaSearch
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="district-search"
                placeholder="Search here"
                className="w-full py-4 pl-14 pr-4 text-lg text-gray-800 bg-gray-50 border border-gray-300 rounded-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                aria-label="Search for a district"
              />
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 text-lg font-semibold text-gray-900 bg-lime-300 rounded-full sm:rounded-l-none hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-400 transition-colors"
            >
              Search
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Search;
