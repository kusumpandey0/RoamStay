import React, { useState } from "react";
import "../styles/DestinationBox.scss";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { IoMdArrowDropright } from "react-icons/io";

const DestinationBox = () => {
  const [destinationWishlist, setDestinationWishlist] = useState(false);
  return (
    <>
      <div className="destinationbox">
        <div className="destinationbox_list">
          <div
            className="destinationbox_list_wishlist"
            onClick={() => setDestinationWishlist(!destinationWishlist)}
          >
            {destinationWishlist ? <PiHeartFill /> : <PiHeart />}
          </div>
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
