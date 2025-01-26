import React, { useState } from "react";
import { FaBed } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { GiHumanPyramid } from "react-icons/gi";
import "../styles/AboutUslist.scss";
const AboutUslist = () => {
  return (
    <>
      <div className="aboutuslist">
        <div className="aboutuslist_box">
          <div className="aboutuslist_box_top">
            <FaBed className="aboutuslist_box_icon" />
            <h3>Book Homestays & Hotels</h3>
          </div>
          <div className="aboutuslist_box_content">
            <p>
              Explore a variety of carefully selected hotels and homestays,
              ideal for any type of vacation. From luxurious stays to
              budget-friendly options, find the perfect place to relax and
              unwind.
            </p>
          </div>
        </div>
        <div className="aboutuslist_box">
          <div className="aboutuslist_box_top">
            <GiPathDistance className="aboutuslist_box_icon" />
            <h3>Homestays on Your Trail</h3>
          </div>

          <div className="aboutuslist_box_content">
            <p>
              Planning a trekking adventure? Our platform allows you to book
              homestays along your trail route, ensuring that your journey is as
              comfortable as it is scenic. Stay with locals, immerse in the
              culture, and rest up for your next trek.
            </p>
          </div>
        </div>
        <div className="aboutuslist_box">
          <div className="aboutuslist_box_top">
            <FaHome className="aboutuslist_box_icon" />
            <h3>List Your Property</h3>
          </div>

          <div className="aboutuslist_box_content">
            <p>
              Have a property you'd like to rent out? List your homestay on our
              platform and earn while you’re away or if you simply want to serve
              guests. It's a great way to share your space with travelers from
              around the world.
            </p>
          </div>
        </div>
        <div className="aboutuslist_box">
          <div className="aboutuslist_box_top">
            <GiHumanPyramid className="aboutuslist_box_icon" />
            <h3>Register as a Travel Guide</h3>
          </div>

          <div className="aboutuslist_box_content">
            <p>
              Share your expertise and passion for travel by registering as a
              travel guide. Help adventurers discover amazing destinations,
              hidden gems, and the best local experiences. Become a part of our
              community and inspire others.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUslist;
