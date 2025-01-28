import React, { useEffect, useState } from "react";
import NewNavbar from "../components/NewNavbar";
import RoomCard from "../components/RoomCard";
import GeoNavigatorMap from "../components/GeoNavigatorMap";
import "../styles/Room.scss";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { categories, facilities, types } from "../categories";
import { useStore } from "../Context/StoreContext";
import axios from "axios";

const Room = () => {
  const { url, location } = useStore();
  console.log("user location", location);
  const [filters, setFilters] = useState({
    distanceFromLocation: [],
    categoryType: [],
    priceRange: {
      min: 0,
      max: 1000,
    },
    propertyType: [],
    amenities: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState([]); // Store fetched properties
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${url}/api/propertylist/read`);
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties);
      } catch (err) {
        console.log(err.message);
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

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    if (type === "categoryType") {
      if (value === "All") {
        setFilters((prev) => ({
          ...prev,
          [type]: checked ? categories.map((category) => category.name) : [],
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [type]: checked
            ? [...prev[type], value]
            : prev[type].filter((item) => item !== value),
        }));
      }
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: checked
          ? [...prev[type], value] // Add the value to the array if checked
          : prev[type].filter((item) => item !== value), // Remove the value if unchecked
      }));
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // This will run whenever 'filters' changes
  useEffect(() => {
    filterProperties();
  }, [filters]);
  const toRad = (value) => {
    return value * (Math.PI / 180);
  };

  const calculateHaversianDistance = (propertyLocation, userLocation) => {
    const R = 6371; // Radius of Earth in km
    const lat1 = toRad(userLocation.lat);
    const lon1 = toRad(userLocation.lng);
    const lat2 = toRad(propertyLocation[1]);
    const lon2 = toRad(propertyLocation[0]);
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance;
  };

  const filterProperties = () => {
    let filtered = [...properties];

    if (filters.distanceFromLocation.length > 0) {
      filtered = filtered.filter((property) => {
        const distance = calculateHaversianDistance(
          property.location,
          location
        );
        console.log(distance);
        return filters.distanceFromLocation.some((range) => {
          if (range === "Less Than 2Km" && distance < 2) return true;
          if (range === "2KM to 5KM" && distance >= 2 && distance <= 5)
            return true;
          if (range === "5KM to 10KM" && distance > 5 && distance <= 10)
            return true;
          if (range === "More than 10KM" && distance > 10) return true;
          return false;
        });
      });
    }

    if (filters.categoryType.length > 0) {
      filtered = filtered.filter((property) => {
        const categories = Array.isArray(property.categoryLists)
          ? property.categoryLists
          : [property.categoryLists];
        const hasMatch = categories.some((category) =>
          filters.categoryType.includes(category.name)
        );
        return hasMatch;
      });
    }

    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter((property) => {
        const price = Number(property.price);
        return (
          price >= filters.priceRange.min && price <= filters.priceRange.max
        );
      });
    }

    if (filters.propertyType.length > 0) {
      filtered = filtered.filter((property) => {
        const types = Array.isArray(property.typeLists)
          ? property.typeLists
          : [property.typeLists];
        console.log(types);
        const hasPropertyMatch = types.some((type) =>
          filters.propertyType.includes(type.name)
        );
        return hasPropertyMatch;
      });
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter((property) => {
        const amenities = Array.isArray(property.amenitiesLists)
          ? property.amenitiesLists
          : [property.amenitiesLists];
        return amenities.some((amenity) =>
          filters.amenities.includes(amenity.name)
        );
      });
    }

    setFilteredProperties(filtered);
  };

  const handlePriceChange = (type) => (e) => {
    const value = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value,
      },
    }));
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
                    value={dis}
                    checked={filters.distanceFromLocation.includes(dis)}
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
            <h3>Price Range</h3>
            <div className="price_range">
              <div className="range_inputs">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={filters.priceRange.min}
                  onChange={handlePriceChange("min")}
                  className="range_slider min"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={filters.priceRange.max}
                  onChange={handlePriceChange("max")}
                  className="range_slider max"
                />
              </div>
              <div className="price_display">
                <div className="price_input">
                  <label>Min:</label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={handlePriceChange("min")}
                    min="0"
                    max={filters.priceRange.max}
                  />
                </div>
                <div className="price_input">
                  <label>Max:</label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={handlePriceChange("max")}
                    min={filters.priceRange.min}
                    max="1000"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="filter_section">
            <h3>Category Type</h3>
            <div className="checkbox_group">
              {categories.map((category) => (
                <label key={category.name}>
                  <input
                    type="checkbox"
                    value={category.name}
                    checked={filters.categoryType.includes(category.name)}
                    onChange={(e) => handleCheckboxChange(e, "categoryType")}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter_section">
            <h3>Property Type</h3>
            <div className="checkbox_group">
              {types.map((type) => (
                <label key={type.name}>
                  <input
                    type="checkbox"
                    value={type.name}
                    checked={filters.propertyType.includes(type.name)}
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
                    checked={filters.amenities.includes(amenity.name)}
                    onChange={(e) => handleCheckboxChange(e, "amenities")}
                  />
                  <span>{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="room_listings">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <RoomCard
                key={property._id}
                title={property.title}
                description={property.description}
                highlight={property.highlight}
                price={property.price}
                location={property.location}
                images={property.images}
                guestCount={property.guestCount}
                bathroomCount={property.bathroomCount}
                bedCount={property.bedCount}
                bedroomCount={property.bedroomCount}
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
