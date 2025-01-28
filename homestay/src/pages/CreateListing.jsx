import React, { useEffect, useState } from "react";
import { categories, facilities, types, basic } from "../categories.jsx";
import GeoNavigatorMap from "../components/GeoNavigatorMap.jsx";
import "../styles/CreateListing.scss";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";
import axios from "axios";
import PhotoUpload from "../components/PhotoUpload.jsx";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS
import Navbar from "../components/Navbar.jsx";
import { useStore } from "../Context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateListing = () => {
  const navigate = useNavigate();
  const [CategoryAll, setCategoryAll] = useState(false);
  const { photos, setPhotos, location, address, url, token } = useStore();

  const today = new Date();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: "",
    amenitiesLists: [],
    categoryLists: [],
    typeLists: [],
    availableDates: [today, today],
    guestCount: 1,
    bedroomCount: 1,
    bedCount: 1,
    bathroomCount: 1,
  });
  const handleSelection = (field, item) => {
    setCategoryAll(!CategoryAll); // Toggle 'All' state
    setFormData((prev) => {
      let list = prev[field]; // Access the list from the formData
      let updated = [...list]; // Create a copy of the list

      if (item.name === "All") {
        if (CategoryAll) {
          updated = [];
        } else {
          updated = categories.filter((i) => i.name !== "All");
        }
      } else {
        setCategoryAll(false);
        if (list.some((i) => i.name === item.name)) {
          updated = list.filter((i) => i.name !== item.name);
        } else {
          updated = [...list, item];
        }
      }

      return { ...prev, [field]: updated };
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleDateChange = (dates) => {
    handleInputChange("availableDates", dates);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, price, availableDates } = formData;
    if (!title || !description || !price || !availableDates.length) {
      alert("Please fill all required fields and set available dates.");
      return;
    }
    const data = new FormData();

    // Append form data
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("highlight", formData.highlight);
    data.append("highlightDesc", formData.highlightDesc);
    data.append("price", formData.price);
    data.append("availableDates", JSON.stringify(formData.availableDates));
    data.append("guestCount", formData.guestCount);
    data.append("bedroomCount", formData.bedroomCount);
    data.append("bedCount", formData.bedCount);
    data.append("bathroomCount", formData.bathroomCount);
    data.append("categoryLists", JSON.stringify(formData.categoryLists));
    data.append("typeLists", JSON.stringify(formData.typeLists));
    data.append("amenitiesLists", JSON.stringify(formData.amenitiesLists));
    data.append("location", JSON.stringify(location));
    data.append("address", address);

    // Append photos
    photos.forEach((photo) => {
      data.append("images", photo);
    });

    try {
      console.log("token", token);
      const response = await axios.post(
        `${url}/api/propertylist/create`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Property added successfully");
      setFormData({
        title: "",
        description: "",
        highlight: "",
        highlightDesc: "",
        price: "",
        amenitiesLists: [],
        categoryLists: [],
        typeLists: [],
        availableDates: [today, today],
        guestCount: 1,
        bedroomCount: 1,
        bedCount: 1,
        bathroomCount: 1,
      });
      setPhotos([]);

      setTimeout(() => {
        navigate("/");
      }, 2000);

      console.log("created", response.data);
    } catch (err) {
      if (err.response) {
        toast.error(`Error: ${err.response.data.message || "Unknown error"}`);
      } else {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>List Your Place</h1>
        <form onSubmit={handleSubmit}>
          <div className="create-listing_step1">
            <h2>Step 1:Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => {
                return (
                  <div
                    className="category"
                    key={index}
                    onClick={() => handleSelection("categoryLists", item)}
                  >
                    <div className="category_item">{item.icon}</div>
                    <p className="category_label">{item.name}</p>
                  </div>
                );
              })}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className="type"
                  key={index}
                  onClick={() => handleSelection("typeLists", item)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3>Where's your place located?</h3>
            <GeoNavigatorMap />

            <h3>When is your place available?</h3>
            <p>Select start and end date of your property's availability.</p>
            <div className="date">
              <DatePicker
                selected={formData.availableDates[0]} // The start date
                onChange={handleDateChange} // Callback for date changes
                startDate={formData.availableDates[0]} // Start of the range
                endDate={formData.availableDates[1]}
                selectsRange
                inline
                minDate={today}
              />
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              {["guestCount", "bedroomCount", "bedCount", "bathroomCount"].map(
                (field, index) => (
                  <div className="basic" key={index}>
                    <p>{field.replace("Count", "")}</p>
                    <div className="basic_count">
                      <FiMinusCircle
                        onClick={() =>
                          formData[field] > 1 &&
                          handleInputChange(field, formData[field] - 1)
                        }
                      />
                      {formData[field]}
                      <FiPlusCircle
                        onClick={() =>
                          handleInputChange(field, formData[field] + 1)
                        }
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className="amenities_list"
                  onClick={() => handleSelection("amenitiesLists", item)}
                  key={index}
                >
                  <p className="amenities_list_icon">{item.icon}</p>
                  <p className="amenities_list_name">{item.name}</p>
                </div>
              ))}
            </div>
            <h3>Add some photos of your place</h3>
            <PhotoUpload />

            <h3>What makes your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
              <p>Description</p>
              <textarea
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                value={formData.highlight}
                onChange={(e) => handleInputChange("highlight", e.target.value)}
              />
              <p>Highlight details</p>
              <textarea
                placeholder="Highlight details"
                name="highlightDesc"
                value={formData.highlightDesc}
                onChange={(e) =>
                  handleInputChange("highlightDesc", e.target.value)
                }
              />
              <p>Now, set your PRICE</p>
              <span>NRs.</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListing;
