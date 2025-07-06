// components/OurPartners.jsx
import React from "react";
import Marquee from "react-fast-marquee";
import PartnerCard from "./PartnerCard";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import start from "../../../assets/brands/start.png";
import amazon_vec from "../../../assets/brands/amazon_vector.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star_people from "../../../assets/brands/start-people.png";

const partners = [
  { name: "Amazon", logo: amazon },
  { name: "Start", logo: start },
  { name: "Casio", logo: casio },
  { name: "Amazo Vector", logo: amazon_vec },
  { name: "Moonstar", logo: moonstar },
  { name: "Randstad", logo: randstad },
  { name: "Star People", logo: star_people },
];

// console.log(partners);

const OurPartners = () => {
  return (
    <section className="py-12  rounded-3xl">
      <h2 className="text-2xl font-bold text-center text-[#003e43] mb-8">
        We've helped thousands of sales teams
      </h2>
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {partners.map((partner, index) => (
          <PartnerCard key={index} partner={partner} />
        ))}
      </Marquee>
    </section>
  );
};

export default OurPartners;
