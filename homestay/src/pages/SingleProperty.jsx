import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useStore } from "../Context/StoreContext";
import NewNavbar from "../components/NewNavbar";
import Footer from "../components/Footer";
import { FaBed, FaBath, FaUser } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import "../styles/SingleProperty.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProperty = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const { url } = useStore();
  const { id } = useParams();
  console.log(id);

  const fetchSingleProperty = async () => {
    try {
      const SingleProperty = await axios.get(
        `${url}/api/propertylist/singleProperty/${id}`
      );
      setProperty(SingleProperty.data.data);
      console.log(SingleProperty);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSingleProperty();
  }, []);

  if (!property) {
    return <div>Property not found</div>;
  }
  const handleBooking = () => {
    toast.success("Booking Confirmed");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <NewNavbar />
      <div className="single-property">
        <div className="property-container">
          {/* Title Section */}
          <div className="title-section">
            <h1>{property.title}</h1>
            <p className="address">{property.address}</p>
          </div>

          {/* Image Gallery */}
          <div className="image-gallery">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={`${url}/${image}`}
                alt={`Property ${index + 1}`}
                className="property-image"
              />
            ))}
          </div>

          {/* Property Details */}
          <div className="property-details">
            <div className="main-info">
              <div className="highlight">
                <h2>{property.highlight}</h2>
                <p>{property.highlightDesc}</p>
              </div>

              <div className="key-features">
                <div className="feature">
                  <FaUser />
                  <span>{property.guestCount} Guests</span>
                </div>
                <div className="feature">
                  <IoBedOutline />
                  <span>{property.bedroomCount} Bedrooms</span>
                </div>
                <div className="feature">
                  <FaBed />
                  <span>{property.bedCount} Beds</span>
                </div>
                <div className="feature">
                  <FaBath />
                  <span>{property.bathroomCount} Bathrooms</span>
                </div>
              </div>
            </div>

            <div className="description">
              <h2>About this place</h2>
              <p>{property.description}</p>
            </div>

            {/* Amenities Section */}
            <div className="amenities">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {property.amenitiesLists.map((amenity, index) => (
                  <div key={index} className="amenity">
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="categories">
              <h2>Property Categories</h2>
              <div className="category-list">
                {property.categoryLists.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Booking Section */}
            <div className="booking-section">
              <div className="price-info">
                <h2>Nrs.{property.price}</h2>
                <span>per night</span>
              </div>

              <div className="availability">
                <h3>Available Dates</h3>
                <div className="dates">
                  {property.availableDates.map((date, index) => (
                    <span key={index}>
                      {new Date(date).toLocaleDateString()}
                    </span>
                  ))}
                </div>
              </div>

              <button className="book-now" onClick={() => handleBooking()}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default SingleProperty;
