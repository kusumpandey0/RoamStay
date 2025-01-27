import React, { useState } from "react";
import NewNavbar from "../components/NewNavbar";
import { useStore } from "../Context/StoreContext";
import "../styles/TravelGuide.scss";
import { FaStar, FaPhone, FaEnvelope, FaLanguage } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const TravelGuide = () => {
  const { setMenu } = useStore();
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
    citizenship: null
  });

  // Mock data for guides
  const guides = [
    {
      id: 1,
      name: "John Doe",
      photo: "/guide1.jpg",
      rating: 4.8,
      experience: "5 years",
      languages: ["English", "Nepali", "Hindi"],
      locations: ["Kathmandu", "Pokhara", "Chitwan"],
      about: "Experienced guide specializing in cultural tours and trekking expeditions. Deep knowledge of local history and customs."
    },
    // Add more guides...
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  setMenu("travelguides");

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
            {guides.map(guide => (
              <div key={guide.id} className="guide_card">
                <div className="guide_photo">
                  <img src={guide.photo} alt={guide.name} />
                </div>
                <div className="guide_info">
                  <div className="guide_header">
                    <h3>{guide.name}</h3>
                    <div className="rating">
                      <FaStar />
                      <span>{guide.rating}</span>
                    </div>
                  </div>
                  <div className="guide_details">
                    <p className="experience">
                      <span>Experience:</span> {guide.experience}
                    </p>
                    <p className="languages">
                      <FaLanguage />
                      <span>{guide.languages.join(", ")}</span>
                    </p>
                    <p className="locations">
                      <MdLocationOn />
                      <span>{guide.locations.join(", ")}</span>
                    </p>
                  </div>
                  <p className="about">{guide.about}</p>
                  <button className="contact_btn">Contact Guide</button>
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
                    onChange={(e) => handleFileChange(e, 'photo')}
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
                    onChange={(e) => handleFileChange(e, 'certificate')}
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
                    onChange={(e) => handleFileChange(e, 'citizenship')}
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
                    I confirm that all provided information and documents are genuine and valid
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
    </div>
  );
};

export default TravelGuide;
