import React, { useState } from "react";
import "../styles/DestinationBox.scss";
import { PiHeart } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { IoMdArrowDropright } from "react-icons/io";

const DestinationBox = () => {
  const [wishlist, setWishlist] = useState(false);
  return (
    <>
      <div className="destinationbox">
        <div className="destinationbox_list">
          {wishlist && (
            <PiHeartFill
              className="destinationbox_list_wishlist"
              onClick={() => setWishlist(false)}
            />
          )}
          {!wishlist && (
            <PiHeart
              className="destinationbox_list_wishlist"
              onClick={() => setWishlist(true)}
            />
          )}
          <img src="../public/herobackground.png" />
          <p className="destinationbox_list_info">
            this place is beautiful.new place.ilove this plavce.visit soon.
          </p>
          <div className="destinationbox_list_moredetails">
            <button>
              more details
              <IoMdArrowDropright className="righticon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationBox;
