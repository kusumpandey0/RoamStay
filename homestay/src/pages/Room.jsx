import React, { useEffect, useState } from "react";
import NewNavbar from "../components/NewNavbar";
import RoomCard from "../components/RoomCard";
import GeoNavigatorMap from "../components/GeoNavigatorMap";
import "../styles/Room.scss";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { categories, facilities, types } from "../categories";
import { useStore } from "../Context/StoreContext";
const Room = () => {
  const { url } = useStore();
  const [filters, setFilters] = useState({
    distanceFromLocation: "",
    categoryType: "",
    priceRange: "",
    propertyType: [],
    amenities: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState([]); // Store fetched properties

  useEffect(() => {
    // Fetch properties from the API
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${url}/api/propertylist/read`); // Adjust the endpoint as needed
        const data = await response.json();
        setProperties(data); // Update state with fetched data
      } catch (err) {
        console.log("Error fetching properties:", err.message);
      }
    };

    fetchProperties();
  }, []);
  const distanceFromLocation = [
    "Less Than 2Km",
    "2KM to 5KM",
    "5KM to 10KM",
    "More than 10KM",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((item) => item !== value),
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="room_page">
      <NewNavbar />
      <div className="room_container">
        <button className="filter_toggle" onClick={toggleFilters}>
          {showFilters ? <IoMdClose /> : <FaFilter />}
          <span>{showFilters ? "Close Filters" : "Show Filters"}</span>
        </button>

        <aside className={`room_filters ${showFilters ? "show" : ""}`}>
          <h2>Filter Options</h2>
          <div className="filter_section">
            <h3>Select a Location</h3>
            <GeoNavigatorMap />
          </div>
          <div className="filter_section">
            <h3>Distance From Location</h3>
            <div className="checkbox_group">
              {distanceFromLocation.map((dis) => (
                <label key={dis}>
                  <input
                    type="checkbox"
                    value={filters.distanceFromLocation}
                    onChange={(e) =>
                      handleCheckboxChange(e, "distanceFromLocation")
                    }
                  />
                  <span>{dis}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="filter_section">
            <h3>Category Type</h3>
            <select
              name="categoryType"
              value={filters.categoryType}
              onChange={handleFilterChange}
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter_section">
            <h3>Price Range</h3>
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Any Price</option>
              <option value="0-100">$0 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201-300">$201 - $300</option>
              <option value="301+">$301+</option>
            </select>
          </div>
          <div className="filter_section">
            <h3>Property Type</h3>
            <div className="checkbox_group">
              {types.map((type) => (
                <label key={type.name}>
                  <input
                    type="checkbox"
                    value={filters.propertyType}
                    onChange={(e) => handleCheckboxChange(e, "propertyType")}
                  />
                  <span>{type.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="filter_section">
            <h3>Amenities</h3>
            <div className="checkbox_group">
              {facilities.map((amenity) => (
                <label key={amenity.name}>
                  <input
                    type="checkbox"
                    value={amenity.name}
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                  />
                  <span>{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="room_listings">
          {properties.length > 0 ? (
            properties.map((property) => (
              <RoomCard
                key={property._id}
                title={property.title}
                description={property.description}
                price={property.price}
                location={property.location}
                images={property.images}
              />
            ))
          ) : (
            <p>No properties found!</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Room;
