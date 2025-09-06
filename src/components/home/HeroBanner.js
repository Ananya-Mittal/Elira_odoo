// HeroBanner.js
import React from "react";
import "./HeroBanner.css";
import heroImage from "../../assets/heroBanner.jpg"; // 👈 your image

const HeroBanner = () => {
  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default HeroBanner;
