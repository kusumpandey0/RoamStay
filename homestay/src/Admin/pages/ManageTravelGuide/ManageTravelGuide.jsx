import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../../Context/StoreContext";
import {
  FaEnvelope,
  FaLanguage,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./ManageTravelGuide.scss";

const ManageTravelGuide = () => {
  const [pendingGuides, setPendingGuides] = useState([]);
  const { url, token } = useStore();

  const fetchPendingTravelGuide = async () => {
    try {
      const response = await axios.get(`${url}/api/travelguide/pendingGuide`);
      setPendingGuides(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (guideId, status) => {
    try {
      await axios.put(
        `${url}/api/travelGuide/changeStatus/${guideId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh the list after status change
      fetchPendingTravelGuide();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingTravelGuide();
  }, []);

  return (
    <div className="guide-management">
      <h1>Travel Guide Applications</h1>
      <div className="guides-container">
        {pendingGuides.map((guide) => (
          <div key={guide._id} className="guide-card">
            <div className="guide-header">
              <div className="profile-image">
                <img src={`${url}/${guide.profilePhoto}`} alt={guide.name} />
              </div>
              <div className="status-badge">{guide.status}</div>
            </div>

            <div className="guide-info">
              <h2>{guide.name}</h2>
              <p>Phone Number:{guide.phoneNumber}</p>
              <div className="info-item">
                <FaEnvelope />
                <span>{guide.email}</span>
              </div>

              <div className="info-item">
                <FaLanguage />
                <span>{guide.languages}</span>
              </div>

              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{guide.locations}</span>
              </div>

              <div className="info-item">
                <FaBriefcase />
                <span>{guide.experience} years experience</span>
              </div>

              <div className="about-section">
                <h3>About</h3>
                <p>{guide.about}</p>
              </div>

              <div className="documents-section">
                <h3>Documents</h3>
                <div className="document-links">
                  <a
                    href={`${url}/${guide.guideCertificate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-link"
                  >
                    Guide Certificate
                  </a>
                  {guide.citizenship.map((doc, index) => (
                    <a
                      key={index}
                      href={`${url}/${doc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-link"
                    >
                      Citizenship {index + 1}
                    </a>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="approve-btn"
                  onClick={() => handleStatusChange(guide._id, "approved")}
                >
                  <FaCheck /> Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleStatusChange(guide._id, "rejected")}
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

export default ManageTravelGuide;
