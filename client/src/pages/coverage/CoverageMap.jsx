// pages/CoverageMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CoverageMap = ({ mapData, filteredData, searchTerm }) => {
  return (
    <div className="w-full h-[calc(100vh-300px)]">
      <MapContainer center={[24.5, 90.0]} zoom={7} className="w-full h-screen">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {(searchTerm ? filteredData : mapData).map((area, index) => (
          <Marker key={index} position={[area.latitude, area.longitude]}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">
                  {area.city}, {area.district}
                </p>
                <p className="text-gray-600">Region: {area.region}</p>
                <p>
                  Status: <span className="text-green-600">{area.status}</span>
                </p>
                <p>Areas: {area.covered_area.join(", ")}</p>
                <a
                  href={area.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Flowchart
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
