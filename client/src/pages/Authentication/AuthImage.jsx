import React from "react";
import bannerImage from "../../assets/authImage.png";

const AuthImage = () => {
  return (
    <div className="hidden md:flex w-1/2 items-center justify-center p-8 bg-[#F7FBF1]">
      <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <img src={bannerImage} alt="" />
      </div>
    </div>
  );
};

export default AuthImage;
