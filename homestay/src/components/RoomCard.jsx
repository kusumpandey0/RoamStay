import React, { useState } from "react";
import "../styles/RoomCard.scss";
import { FaBed, FaBath, FaUser } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";

const RoomCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="room_container">
      <div className="roomcard">
        <div className="roomcard_image">
          <img src="/herobackground.png" alt="room" />
          <div
            className="wishlist_icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? <PiHeartFill /> : <PiHeart />}
          </div>
        </div>

        <div className="roomcard_content">
          <div className="roomcard_content_top">
            <h3>Luxury Villa</h3>
          </div>
          <p className="highlight">Mountain View</p>
          <p className="description">Description</p>
          <div className="roomcard_content_features">
            <div className="feature">
              <FaUser />
              <span>4 Guests</span>
            </div>
            <div className="feature">
              <IoBedOutline />
              <span>2 Bedrooms</span>
            </div>
            <div className="feature">
              <FaBed />
              <span>3 Beds</span>
            </div>
            <div className="feature">
              <FaBath />
              <span>2 Baths</span>
            </div>
          </div>
        </div>

        <div className="roomcard_right">
          <div className="roomcard_price">
            <span>$250</span>
            <small>/night</small>
          </div>
          <button className="explore_btn">
            Explore More
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
