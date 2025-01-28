import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../../Context/StoreContext";
import {
  FaCheck,
  FaTimes,
  FaBed,
  FaBath,
  FaUsers,
  FaDoorOpen,
} from "react-icons/fa";
import "./ManageRooms.scss";

const ManageRooms = () => {
  const [pendingRooms, setPendingRooms] = useState([]);
  const { url, token, fetchProperties } = useStore();

  const fetchPendingRooms = async () => {
    try {
      const response = await axios.get(
        `${url}/api/propertylist/pendingProperty`
      );
      setPendingRooms(response.data.properties);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (roomId, status) => {
    try {
      await axios.put(
        `${url}/api/propertylist/changeStatus/${roomId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingRooms();
      fetchProperties();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingRooms();
  }, []);

  return (
    <div className="rooms-management">
      <h1>Room Applications</h1>
      <div className="rooms-container">
        {pendingRooms.map((room) => (
          <div key={room._id} className="room-card">
            <div className="room-header">
              <div className="image-gallery">
                <img src={`${url}/${room.images[0]}`} alt={room.title} />
              </div>
              <div className="status-badge">{room.status}</div>
            </div>

            <div className="room-info">
              <h2>{room.title}</h2>
              <p className="location"> {room.address} per night</p>
              <p className="price">NPR {room.price} per night</p>
              <div className="features">
                <div className="feature-item">
                  <FaUsers />
                  <span>{room.guestCount} Guests</span>
                </div>
                <div className="feature-item">
                  <FaDoorOpen />
                  <span>{room.bedroomCount} Bedrooms</span>
                </div>
                <div className="feature-item">
                  <FaBed />
                  <span>{room.bedCount} Beds</span>
                </div>
                <div className="feature-item">
                  <FaBath />
                  <span>{room.bathroomCount} Baths</span>
                </div>
              </div>

              <div className="description-section">
                <h3>Description</h3>
                <p>{room.description}</p>
              </div>

              <div className="highlight-section">
                <h3>Highlight</h3>
                <p>{room.highlight}</p>
                <p className="highlight-desc">{room.highlightDesc}</p>
              </div>

              <div className="amenities-section">
                <h3>Amenities</h3>
                <div className="amenities-list">
                  {room.amenitiesLists.map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => handleStatusChange(room._id, "approved")}
                >
                  <FaCheck /> Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleStatusChange(room._id, "rejected")}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;
