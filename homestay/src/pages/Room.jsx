import React, { useEffect, useState } from "react";
import NewNavbar from "../components/NewNavbar";
import RoomCard from "../components/RoomCard";
import GeoNavigatorMap from "../components/GeoNavigatorMap";
import RouteMap from "../components/RouteMap";
import "../styles/Room.scss";
import { FaFilter, FaRoute } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { categories, facilities, types } from "../categories";
import { useStore } from "../Context/StoreContext";
import axios from "axios";
import Footer from "../components/Footer";


const Room = () => {
  const { url, location, properties, setProperties } = useStore();
  const [filters, setFilters] = useState({
    distanceFromLocation: [],
    categoryType: [],
    priceRange: {
      min: 0,
      max: 10000,
    },
    propertyType: [],
    amenities: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  // Store fetched properties
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showRouteMaps, setShowRouteMaps] = useState(false);
  const [routePoints, setRoutePoints] = useState({
    start: {
      lat: null,
      lng: null,
      address: "",
    },
    end: {
      lat: null,
      lng: null,
      address: "",
    },
  });

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
    console.log("user", lat2, lon2);
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;

    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    console.log(distance);
    return distance;
  };
  useEffect(() => {
    if (
      filters.distanceFromLocation.length === 0 &&
      filters.categoryType.length === 0 &&
      filters.propertyType.length === 0 &&
      filters.amenities.length === 0 &&
      filters.priceRange.min === 0 &&
      filters.priceRange.max === 10000
    ) {
      setFilteredProperties(properties);
    } else {
      filterProperties();
    }
  }, [filters, properties]);

  const filterProperties = () => {
    let filtered = [...properties];

    if (filters.distanceFromLocation.length > 0) {
      filtered = filtered.filter((property) => {
        const distance = calculateHaversianDistance(
          property.location,
          location
        );
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
    } else {
      // When no distance filter is selected, skip this filter
      setFilteredProperties(filtered);
    }

    if (filters.categoryType.length > 0) {
      filtered = filtered.filter((property) => {
        const categories = Array.isArray(property.categoryLists)
          ? property.categoryLists
          : [property.categoryLists];
        return categories.some((category) =>
          filters.categoryType.includes(category.name)
        );
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
        return types.some((type) => filters.propertyType.includes(type.name));
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

  useEffect(() => {
    console.log("showproperties", filteredProperties);
  }, [filters]);
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
  const getRouteFromOSRM = async (start, end) => {
    try {
      const routeUrl = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`;
      const response = await axios.get(routeUrl);

      if (!response.data.routes || response.data.routes.length === 0) {
        throw new Error("No route found");
      }

      const routeGeometry = response.data.routes[0].geometry;
      const decodedRoute = decodePolyline(routeGeometry);
      return decodedRoute;
    } catch (error) {
      console.error("Error fetching route from OSRM:", error);
      return [];
    }
  };
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return points;
  };
  // Update findPropertiesOnRoute to use new route points
  const findPropertiesOnRoute = async () => {
    if (!routePoints.start.lat || !routePoints.end.lat) {
      alert("Please select both start and end points");
      return;
    }

    try {
      const routePath = await getRouteFromOSRM(
        routePoints.start,
        routePoints.end
      );

      if (routePath.length === 0) {
        alert("Could not find a route between these points");
        return;
      }

      const propertiesOnRoute = properties.filter((property) => {
        return isPropertyAlongRoute(property, routePath);
      });

      if (propertiesOnRoute.length === 0) {
      }

      setFilteredProperties(propertiesOnRoute);
      setShowRouteMaps(false);
    } catch (error) {
      console.error("Error in route planning:", error);
      alert("Error finding properties along the route");
    }
  };

  const isPropertyAlongRoute = (property, routePath) => {
    const propertyLat = property.location[1];
    const propertyLng = property.location[0];
    const maxDistance = 1; // 1 km threshold

    // Check each segment of the route
    for (let i = 0; i < routePath.length - 1; i++) {
      const start = routePath[i];
      const end = routePath[i + 1];

      // Calculate the exact distance from the property to the segment
      const distance = calculateExactDistanceToSegment(
        { lat: propertyLat, lng: propertyLng },
        { lat: start.lat, lng: start.lng },
        { lat: end.lat, lng: end.lng }
      );
      console.log(distance);
      // If the property is within the max distance of the segment, return true
      if (distance <= maxDistance) {
        return true;
      }
    }

    return false;
  };

  // Calculate the exact distance from the point to the closest point on the segment
  const calculateExactDistanceToSegment = (point, start, end) => {
    // Convert points to radians
    const p = { lat: toRad(point.lat), lng: toRad(point.lng) };
    const s = { lat: toRad(start.lat), lng: toRad(start.lng) };
    const e = { lat: toRad(end.lat), lng: toRad(end.lng) };

    // Calculate the distance to the endpoints
    const distanceToStart = haversineDistance(p, s);
    const distanceToEnd = haversineDistance(p, e);

    // Calculate the bearing and project the point onto the segment
    const dX = e.lng - s.lng;
    const dY = e.lat - s.lat;

    // Handle degenerate case where the start and end points are the same
    const segmentLengthSquared = dX ** 2 + dY ** 2;
    if (segmentLengthSquared === 0) return distanceToStart; // Start and end are the same

    // Calculate projection scalar t
    const t =
      ((p.lng - s.lng) * dX + (p.lat - s.lat) * dY) / segmentLengthSquared;

    // Clamp t to the range [0, 1] (projection must be on the segment)
    const tClamped = Math.max(0, Math.min(1, t));

    // Find the closest point on the segment
    const closestPoint = {
      lat: s.lat + tClamped * dY,
      lng: s.lng + tClamped * dX,
    };

    // Calculate the distance from the point to the closest point on the segment
    return haversineDistance(p, closestPoint);
  };

  // Haversine formula to calculate the distance between two points
  const haversineDistance = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = p2.lat - p1.lat;
    const dLon = p2.lng - p1.lng;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat) *
      Math.cos(p2.lat) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="room_page">
      <NewNavbar />
      <div className="room_container">
        <button className="filter_toggle" onClick={toggleFilters}>
          {showFilters ? <IoMdClose /> : <FaFilter />}
          <span>{showFilters ? "Close Filters" : "Show Filters"}</span>
        </button>

        <button
          className="route_planner_btn"
          onClick={() => setShowRouteMaps(!showRouteMaps)}
        >
          <FaRoute />
          <span>Plan Route</span>
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
                  max="10000"
                  step="50"
                  value={filters.priceRange.min}
                  onChange={handlePriceChange("min")}
                  className="range_slider min"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
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
                    max="10000"
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
                id={property._id}
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
                host={property.host}
              />
            ))
          ) : (
            <p>No properties found!</p>
          )}
        </main>

        {showRouteMaps && (
          <div className="route_maps_modal">
            <div className="modal_content">
              <div className="modal_header">
                <h3>Select Route Points</h3>
                <button onClick={() => setShowRouteMaps(false)}>
                  <IoMdClose />
                </button>
              </div>

              <div className="maps_container">
                <div className="map_section">
                  <h4>Starting Point</h4>
                  <RouteMap
                    onLocationSelect={(location, address) => {
                      setRoutePoints((prev) => ({
                        ...prev,
                        start: {
                          lat: location.lat,
                          lng: location.lng,
                          address,
                        },
                      }));
                    }}
                    isStart={true}
                  />
                </div>

                <div className="map_section">
                  <h4>Destination Point</h4>
                  <RouteMap
                    onLocationSelect={(location, address) => {
                      setRoutePoints((prev) => ({
                        ...prev,
                        end: {
                          lat: location.lat,
                          lng: location.lng,
                          address,
                        },
                      }));
                    }}
                    isStart={false}
                  />
                </div>
              </div>

              <button
                className="find_stays_btn"
                onClick={findPropertiesOnRoute}
                disabled={!routePoints.start.lat || !routePoints.end.lat}
              >
                Find Homestays on Route
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Room;
