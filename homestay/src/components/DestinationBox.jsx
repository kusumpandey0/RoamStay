import { useState } from "react";
import "../styles/DestinationBox.scss";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { IoMdArrowDropright } from "react-icons/io";
import { useStore } from "../Context/StoreContext";

const DestinationBox = ({ destination }) => {
  const { url } = useStore();
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
          <img src={`${url}/${destination?.destinationPhoto[0]}`} />
          <h4>{destination?.title}</h4>
          <p className="destinationbox_list_info">{destination?.description}</p>
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
