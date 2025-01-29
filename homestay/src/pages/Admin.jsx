import React, { useState, useEffect } from "react";
import "../styles/Admin.scss";
import { useStore } from "../Context/StoreContext";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const Admin = () => {
  const { url, token } = useStore();
  const [activeTab, setActiveTab] = useState("rooms");
  const [pendingRooms, setPendingRooms] = useState([]);
  const [pendingDestinations, setPendingDestinations] = useState([]);
  const [pendingGuides, setPendingGuides] = useState([]);

  useEffect(() => {
    fetchPendingListings();
  }, [activeTab]);

  const fetchPendingListings = async () => {
    try {
      switch (activeTab) {
        case "rooms":
          const roomsRes = await axios.get(`${url}/api/propertylist/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPendingRooms(roomsRes.data.properties);
          break;
        case "destinations":
          const destRes = await axios.get(`${url}/api/destination/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPendingDestinations(destRes.data.destinations);
          break;
        case "guides":
          const guidesRes = await axios.get(`${url}/api/travelGuide/pending`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPendingGuides(guidesRes.data.guides);
          break;
      }
    } catch (err) {
      console.error("Error fetching pending listings:", err);
    }
  };

  const handleApproval = async (id, type, status) => {
    try {
      let endpoint;
      switch (type) {
        case "rooms":
          endpoint = `${url}/api/propertylist/approve/${id}`;
          break;
        case "destinations":
          endpoint = `${url}/api/destination/approve/${id}`;
          break;
        case "guides":
          endpoint = `${url}/api/travelGuide/approve/${id}`;
          break;
      }

      await axios.put(
        endpoint,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchPendingListings();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="tabs">
        <button
          className={activeTab === "rooms" ? "active" : ""}
          onClick={() => setActiveTab("rooms")}
        >
          Pending Rooms
        </button>
        <button
          className={activeTab === "destinations" ? "active" : ""}
          onClick={() => setActiveTab("destinations")}
        >
          Pending Destinations
        </button>
        <button
          className={activeTab === "guides" ? "active" : ""}
          onClick={() => setActiveTab("guides")}
        >
          Pending Guides
        </button>
      </div>

      <div className="listings-container">
        {activeTab === "rooms" && (
          <div className="pending-rooms">
            <h2>Pending Room Approvals</h2>
            {pendingRooms.map((room) => (
              <div key={room._id} className="pending-item">
                <div className="item-details">
                  <img src={`${url}/${room.images[0]}`} alt={room.title} />
                  <div className="info">
                    <h3>{room.title}</h3>
                    <p>{room.description}</p>
                    <p>Price: ${room.price}/night</p>
                    <p>Host: {room.host.name}</p>
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="approve"
                    onClick={() =>
                      handleApproval(room._id, "rooms", "approved")
                    }
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() =>
                      handleApproval(room._id, "rooms", "rejected")
                    }
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "destinations" && (
          <div className="pending-destinations">
            <h2>Pending Destination Approvals</h2>
            {pendingDestinations.map((dest) => (
              <div key={dest._id} className="pending-item">
                <div className="item-details">
                  <img src={`${url}/${dest.images[0]}`} alt={dest.title} />
                  <div className="info">
                    <h3>{dest.title}</h3>
                    <p>{dest.description}</p>
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="approve"
                    onClick={() =>
                      handleApproval(dest._id, "destinations", "approved")
                    }
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() =>
                      handleApproval(dest._id, "destinations", "rejected")
                    }
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guides" && (
          <div className="pending-guides">
            <h2>Pending Guide Approvals</h2>
            {pendingGuides.map((guide) => (
              <div key={guide._id} className="pending-item">
                <div className="item-details">
                  <img src={`${url}/${guide.profilePhoto}`} alt={guide.name} />
                  <div className="info">
                    <h3>{guide.name}</h3>
                    <p>{guide.about}</p>
                    <p>Experience: {guide.experience}</p>
                    <p>Languages: {guide.languages}</p>
                    <div className="documents">
                      <a href={`${url}/${guide.certificate}`} target="_blank">
                        View Certificate
                      </a>
                      <a href={`${url}/${guide.citizenship}`} target="_blank">
                        View Citizenship
                      </a>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="approve"
                    onClick={() =>
                      handleApproval(guide._id, "guides", "approved")
                    }
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() =>
                      handleApproval(guide._id, "guides", "rejected")
                    }
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
