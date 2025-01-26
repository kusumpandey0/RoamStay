import React from "react";
import "../styles/RoomCard.scss";
const RoomCard = () => {
  return (
    <div className="roomcard">
      <div className="roomcard_photos">Photos</div>
      <div className="roomcard_info">Info</div>
      <div className="roomcard_price">Price</div>
    </div>
  );
};

export default RoomCard;
