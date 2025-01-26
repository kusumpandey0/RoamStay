import React from "react";
import "../styles/PopularDestinations.scss";
import DestinationBox from "./DestinationBox";
const PopularDestinations = () => {
  return (
    <>
      <div className="populardestinations">
        <div className="populardestinations_top">
          <div className="populardestinations_top_texts">
            <p className="populardestinations_top_texts_explain1">
              This season's
            </p>
            <h1>Popular Destinations</h1>
            <p className="populardestinations_top_texts_explain2">
              Explore the most popular destinations of the season! From scenic
              getaways to cultural hotspots, there's a perfect place waiting for
              you. Start planning your dream adventure today!
            </p>
          </div>
          <div className="populardestinations_top_content">
            <DestinationBox />
          </div>
        </div>
        <div className="populardestinations_bottom">
          <button>Explore More</button>
        </div>
      </div>
    </>
  );
};

export default PopularDestinations;
