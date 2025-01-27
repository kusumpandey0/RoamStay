import React from "react";
import "../styles/Hero.scss";
import CheckAvailability from "./CheckAvailability";
const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero_texts">
          <h1 style={{ fontSize: "50px", textAlign: "left" }}>
            Find Your Perfect Gateaway-
          </h1>
          <p style={{ fontSize: "18px" }}>
            Experience comfort, style, and personalized stays at unique
            homestays and top-rated hotels. Plan your journey with ease – Book
            Now!
          </p>
        </div>
        <div className="hero_checkavailabilitydiv">
          <CheckAvailability />
        </div>
      </div>
    </>
  );
};

export default Hero;
