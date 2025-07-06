import React, { useState } from "react";
import Search from "./Search";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const mapData = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.toLowerCase();

    setSearchTerm(value);

    const filtered = mapData.filter(
      (item) =>
        item.city.toLowerCase().includes(value) ||
        item.district.toLowerCase().includes(value) ||
        item.covered_area.some((area) => area.toLowerCase().includes(value))
    );

    setFilteredData(filtered);
  };

  return (
    <div className="bg-gray-100 mt-28 rounded-2xl">
      <Search handleSearch={handleSearch} />

      <CoverageMap
        mapData={mapData}
        filteredData={filteredData}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Coverage;
