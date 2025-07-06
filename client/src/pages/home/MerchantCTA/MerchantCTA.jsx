// components/MerchantCTA.jsx
import React from "react";
import locationMerchent from "../../../assets/location-merchant.png";
import bannerMerchant from "../../../assets/be-a-merchant-bg.png";

const MerchantCTA = () => {
  return (
    <section className="relative bg-[#03373D] text-white rounded-2xl overflow-hidden px-6 py-12">
      {/* Top wave/background image */}
      <img
        src={bannerMerchant}
        alt="Top design"
        className="absolute top-0 left-0 w-full object-cover z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left content */}
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Merchant and Customer Satisfaction
            <br /> is Our First Priority
          </h2>
          <p className="text-gray-300 mb-6 max-w-md">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Profast courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-[#D4F045] text-[#003e43] font-semibold px-5 py-2 rounded-full">
              Become a Merchant
            </button>
            <button className="border border-[#D4F045] text-[#D4F045] hover:text-[#003e43] hover:bg-[#D4F045] font-semibold px-5 py-2 rounded-full">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center">
          <img
            src={locationMerchent}
            alt="Parcel Illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default MerchantCTA;
