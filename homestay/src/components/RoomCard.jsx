import React, { useState } from "react";
import "../styles/RoomCard.scss";
import { FaBed, FaBath, FaUser } from "react-icons/fa";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { useStore } from "../Context/StoreContext";
import { Link } from "react-router-dom";

const RoomCard = ({
  id,
  title,
  description,
  highlight,
  price,
  location,
  images,
  guestCount,
  bathroomCount,
  bedCount,
  bedroomCount,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { url } = useStore();
  return (
    <div className="room_container">
      <div className="roomcard">
        <div className="roomcard_image">
          {/* Use dynamic image path */}
          <img
            src={`${url}/${images[0]}` || "/herobackground.png"}
            alt="room"
          />
          <div
            className="wishlist_icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? <PiHeartFill /> : <PiHeart />}
          </div>
        </div>

        <div className="roomcard_content">
          <div className="roomcard_content_top">
            <h3>{title}</h3> {/* Use dynamic title */}
          </div>
          <p className="highlight">{highlight}</p> {/* Use dynamic highlight */}
          <p className="description">{description}</p>{" "}
          {/* Use dynamic description */}
          <div className="roomcard_content_features">
            <div className="feature">
              <FaUser />
              <span>{guestCount} Guests</span>{" "}
              {/* You can calculate guest count based on location */}
            </div>
            <div className="feature">
              <IoBedOutline />
              <span>{bedroomCount} Bedrooms</span>{" "}
              {/* Adjust based on your data */}
            </div>
            <div className="feature">
              <FaBed />
              <span>{bedCount} Beds</span> {/* Adjust based on your data */}
            </div>
            <div className="feature">
              <FaBath />
              <span>{bathroomCount} Baths</span>{" "}
              {/* Adjust based on your data */}
            </div>
          </div>
        </div>

        <div className="roomcard_right">
          <div className="roomcard_price">
            <span>Nrs.{price}</span>
            <small>/night</small>
          </div>
          <Link to={`/property/${id}`}>
            <button className="explore_btn">
              Explore More
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
