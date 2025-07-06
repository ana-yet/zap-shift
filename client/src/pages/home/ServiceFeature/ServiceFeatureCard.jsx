// components/ServiceFeatureCard.jsx
import React from "react";

const ServiceFeatureCard = ({ feature }) => {
  const { title, description, logo } = feature;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm">
      {/* Placeholder for Image */}
      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400">
        <img src={logo} alt="title" />
      </div>

      {/* Text Content */}
      <div>
        <h3 className="text-lg font-semibold text-[#003e43] mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ServiceFeatureCard;
