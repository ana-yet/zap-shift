// components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ service }) => {
  const { title, description, icon: Icon } = service;

  return (
    <div className="p-6 rounded-2xl shadow-md text-center transition duration-300 bg-white text-[#003e43] hover:bg-[#D4F045] hover:text-[#003e43]">
      {/* Icon */}
      <div className="flex justify-center mb-4 text-4xl">
        <Icon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 hover:text-[#003e43]">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
