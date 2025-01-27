import React, { useState } from "react";
import "../styles/RoomCard.scss";
import { FaBed, FaBath, FaUser } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";

const RoomCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="roomcard">
      <div className="roomcard_image">
        <img src="../public/herobackground.png" alt="nnn" />
        <div className="wishlist_icon" onClick={handleFavoriteClick}>
          {isFavorite ? <PiHeartFill /> : <PiHeart />}
        </div>
      </div>

      <div className="roomcard_content">
        <div className="roomcard_content_top">
          <h3>Title</h3>
          <div className="rating">
            <BsFillStarFill />
            <span>4.8</span>
          </div>
        </div>
        <p className="highlight">Highlight</p>
        <div className="roomcard_content_features">
          <div className="feature">
            <FaUser />
            <span>Guests</span>
          </div>
          <div className="feature">
            <IoBedOutline />
            <span> Bedrooms</span>
          </div>
          <div className="feature">
            <FaBed />
            <span> Beds</span>
          </div>
          <div className="feature">
            <FaBath />
            <span> Baths</span>
          </div>
        </div>
      </div>

      <div className="roomcard_right">
        <div className="roomcard_price">
          <span>$100</span>
          <small>/night</small>
        </div>
        <button className="explore_btn">
          Explore More
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
