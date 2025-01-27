import React, { useState } from "react";
import NewNavbar from "../components/NewNavbar";
import RoomCard from "../components/RoomCard";
import "../styles/Room.scss";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { categories, facilities, types } from "../categories";
const Room = () => {
  const [filters, setFilters] = useState({
    propertyType: "",
    priceRange: "",
    amenities: [],
    houseRules: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const propertyType = types;
  const amenitiesOptions = ["Wi-Fi", "Kitchen", "AC", "TV", "Parking", "Pool"];
  const houseRulesOptions = ["No Smoking", "No Pets", "No Parties"];

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
            <h3>Property Type</h3>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type}
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
            <h3>Amenities</h3>
            <div className="checkbox_group">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter_section">
            <h3>House Rules</h3>
            <div className="checkbox_group">
              {houseRulesOptions.map((rule) => (
                <label key={rule}>
                  <input
                    type="checkbox"
                    value={rule}
                    checked={filters.houseRules.includes(rule)}
                    onChange={(e) => handleCheckboxChange(e, "houseRules")}
                  />
                  <span>{rule}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="room_listings">
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </main>
      </div>
    </div>
  );
};

export default Room;
