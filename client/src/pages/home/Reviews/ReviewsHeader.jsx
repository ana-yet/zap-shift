import React from "react";

const ReviewsHeader = ({ headerImage }) => {
  return (
    <div>
      {/* Header */}
      <img
        src={headerImage}
        alt="Review Illustration"
        className="mx-auto mb-4"
      />
      <h2 className="text-3xl font-bold text-[#003e43] mb-2">
        What our customers are sayings
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
    </div>
  );
};

export default ReviewsHeader;
