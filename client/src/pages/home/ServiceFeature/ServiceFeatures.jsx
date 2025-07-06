// components/ServiceFeatures.jsx
import React from "react";
import ServiceFeatureCard from "./ServiceFeatureCard";

import f1 from "../../../assets/feature/f1.png";
import f2 from "../../../assets/feature/f2.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    logo: f1,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    logo: f2,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    logo: f2,
  },
];

const ServiceFeatures = () => {
  return (
    <section className=" py-16 px-4">
      <div className=" mx-auto space-y-6">
        {features.map((feature, index) => (
          <ServiceFeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
