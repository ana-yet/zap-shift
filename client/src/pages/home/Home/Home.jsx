import React from "react";
import Banner from "../Banner/Banner";
import OurServices from "../OurServices/OurServices";
import OurPartners from "../OurPartners/OurPartners";
import ServiceFeatures from "../ServiceFeature/ServiceFeatures";
import MerchantCTA from "../MerchantCTA/MerchantCTA";

const Home = () => {
  return (
    <div>
      <Banner />

      <OurServices />

      <OurPartners />

      <ServiceFeatures />

      <MerchantCTA />
    </div>
  );
};

export default Home;
