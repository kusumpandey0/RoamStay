import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../../Context/StoreContext";
import { FaCheck, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import "./ManageDestinations.scss";

const ManageDestinations = () => {
  const [pendingDestinations, setPendingDestinations] = useState([]);
  const { url, token } = useStore();

  const fetchPendingDestinations = async () => {
    try {
      const response = await axios.get(
        `${url}/api/destination/pendingDestination`
      );
      console.log(response.data.data);
      setPendingDestinations(response.data.data);
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const handleStatusChange = async (destinationId, status) => {
    try {
      await axios.put(
        `${url}/api/destination/changeStatus/${destinationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingDestinations();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingDestinations();
  }, []);

  return (
    <div className="destinations-management">
      <h1>Destination Applications</h1>
      <div className="destinations-container">
        {pendingDestinations?.map((destination) => (
          <div key={destination._id} className="destination-card">
            <div className="destination-header">
              <div className="image-gallery">
                <img
                  src={`${url}/${destination.destinationPhoto[0]}`}
                  alt={destination.title}
                />
              </div>
              <div className="status-badge">{destination.status}</div>
            </div>

            <div className="destination-info">
              <h2>{destination.title}</h2>

              <div className="description-section">
                <h3>Description</h3>
                <p>{destination.description}</p>
              </div>

              <div className="images-section">
                <h3>Additional Images</h3>
                <div className="image-grid">
                  {destination.destinationPhoto.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={`${url}/${image}`}
                      alt={`${destination.title} ${index + 2}`}
                    />
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() =>
                    handleStatusChange(destination._id, "approved")
                  }
                >
                  <FaCheck /> Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() =>
                    handleStatusChange(destination._id, "rejected")
                  }
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

export default ManageDestinations;
