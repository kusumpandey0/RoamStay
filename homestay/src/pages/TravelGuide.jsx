import React, { useEffect, useState } from "react";
import NewNavbar from "../components/NewNavbar";
import { useStore } from "../Context/StoreContext";
import "../styles/TravelGuide.scss";
import { FaStar, FaPhone, FaEnvelope, FaLanguage } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const TravelGuide = () => {
  const navigate = useNavigate();
  const { setMenu, url, token } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    languages: "",
    experience: "",
    locations: "",
    about: "",
    photo: null,
    certificate: null,
    citizenship: null,
  });

  // Mock data for guides
  const [guides, setGuides] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("languages", formData.languages);
    data.append("experience", formData.experience);
    data.append("locations", formData.locations);
    data.append("about", formData.about);
    data.append("photo", formData.photo);
    data.append("certificate", formData.certificate);
    data.append("citizenship", formData.citizenship);

    try {
      const res = await axios.post(`${url}/api/travelGuide/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success Toast
      toast.success("Travel guide application submitted successfully!");

      fetchTravelGuide();

      // Reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        languages: "",
        experience: "",
        locations: "",
        about: "",
        photo: null,
        certificate: null,
        citizenship: null,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      // Error Toast
      toast.error(
        `Error: ${err.response ? err.response.data.message : "Unknown error"}`
      );
    }
  };

  const fetchTravelGuide = async () => {
    try {
      const res = await axios.get(`${url}/api/travelGuide/approvedGuide`);
      setGuides(res?.data?.data);
    } catch (err) {
      toast.error(
        `Error fetching guides: ${
          err.response ? err.response.data.message : "Unknown error"
        }`
      );
    }
  };

  useEffect(() => {
    fetchTravelGuide();
  }, []);

  const [contactBtnState, setContactBtnState] = useState({});

  const handleContactbtn = (guideId) => {
    setContactBtnState((prev) => ({
      ...prev,
      [guideId]: !prev[guideId],
    }));
  };

  return (
    <div className="travel_guide_page">
      <NewNavbar />
      <div className="travel_guide_container">
        <div className="guide_header">
          <h1>Travel Guides</h1>
          <button
            className="become_guide_btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "View Guides" : "Become a Guide"}
          </button>
        </div>

        {!showForm ? (
          <div className="guides_list">
            {guides?.map((guide) => (
              <div key={guide._id} className="guide_card">
                <div className="guide_photo">
                  <img src={`${url}/${guide.profilePhoto}`} alt={guide.name} />
                </div>
                <div className="guide_info">
                  <div className="guide_header">
                    <h3>{guide.name}</h3>
                  </div>
                  <div className="guide_details">
                    <p className="experience">
                      <span>Experience:</span> {guide.experience}
                    </p>
                    <p className="languages">
                      <FaLanguage />
                      <span>{guide.languages}</span>
                    </p>
                    <p className="locations">
                      <MdLocationOn />
                      <span>{guide.locations}</span>
                    </p>
                  </div>
                  <p className="about">{guide.about}</p>
                  <button
                    className="contact_btn"
                    onClick={() => handleContactbtn(guide._id)}
                  >
                    Contact Guide{" "}
                    {contactBtnState[guide._id] && guide.phoneNumber}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="guide_registration">
            <h2>Register as a Travel Guide</h2>
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label>Languages Spoken</label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  placeholder="e.g., English, Nepali, Hindi"
                  required
                />
              </div>
              <div className="form_group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form_group">
                <label>Preferred Locations</label>
                <input
                  type="text"
                  name="locations"
                  value={formData.locations}
                  onChange={handleInputChange}
                  placeholder="e.g., Kathmandu, Pokhara"
                  required
                />
              </div>
              <div className="form_group">
                <label>About Yourself</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="document_section">
                <h3>Required Documents</h3>
                <div className="form_group">
                  <label>Profile Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={(e) => handleFileChange(e, "photo")}
                    accept="image/*"
                    required
                  />
                  <small>Upload a clear, professional photo of yourself</small>
                </div>

                <div className="form_group">
                  <label>Tourism Guide Certificate</label>
                  <input
                    type="file"
                    name="certificate"
                    onChange={(e) => handleFileChange(e, "certificate")}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <small>Upload your valid tourism guide certificate</small>
                </div>

                <div className="form_group">
                  <label>Citizenship/Identity Proof</label>
                  <input
                    type="file"
                    name="citizenship"
                    onChange={(e) => handleFileChange(e, "citizenship")}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                  <small>Upload your citizenship or valid identity proof</small>
                </div>
              </div>

              <div className="terms_section">
                <label className="checkbox_label">
                  <input type="checkbox" required />
                  <span>
                    I confirm that all provided information and documents are
                    genuine and valid
                  </span>
                </label>
              </div>

              <button type="submit" className="submit_btn">
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default TravelGuide;
