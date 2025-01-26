import React from "react";
import "../styles/AboutUs.scss";
import AboutUslist from "./AboutUslist";
const AboutUs = () => {
  return (
    <>
      <div className="aboutus" id="about-us">
        <h5 className="aboutus_heading">LITTLE ABOUT US</h5>
        <div className="aboutus_content">
          <div className="aboutus_content_left">
            <img
              src="../../public/herobackground.png"
              className="aboutus_content_left_pic"
            />
          </div>
          <div className="aboutus_content_right">
            <p>
              At Roamstay, we believe that every journey deserves a home away
              from home. Whether you're looking for a cozy homestay during your
              vacation or a comfortable hotel for your stay, we provide a wide
              range of accommodations tailored to your needs. Here’s what we
              offer:
            </p>
            <AboutUslist />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
