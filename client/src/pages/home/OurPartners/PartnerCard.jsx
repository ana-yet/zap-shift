import React from "react";

const PartnerCard = ({ partner }) => {
  return (
    <div className="mx-6 flex items-center">
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-6 mx-6 w-auto object-contain"
      />
    </div>
  );
};

export default PartnerCard;
