import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/GeoNavigatorMap.scss";
import { useStore } from "../Context/StoreContext";

const LocationMarker = ({ location, handleMapClick, handleMapDrag }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return location.lat ? (
    <Marker
      position={[location.lat, location.lng]}
      draggable={true}
      eventHandlers={{
        dragend: (e) => handleMapDrag(e),
      }}
    />
  ) : null;
};

const UpdateMapCenter = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location.lat && location.lng) {
      map.setView([location.lat, location.lng], 20);
    }
  }, [map, location]);
  return null;
};

const GeoNavigatorMap = () => {
  const {
    handleSuggestionSelect,
    fetchSuggestion,
    location,
    setLocation,
    address,
    setAddress,
    suggestions,
  } = useStore();
  const [isChecked, setIsChecked] = useState(false);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLocation({ lat, lng });
    fetchAddress(lat, lng);
  };

  const handleMapDrag = (ev) => {
    const { lat, lng } = ev.target._latlng;
    setLocation({ lat, lng });
    fetchAddress(lat, lng);
  };

  useEffect(() => {
    if (isChecked && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((place) => {
        const { latitude, longitude } = place.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude);
      });
    }
  }, [isChecked]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setAddress(query);
    fetchSuggestion(query);
  };

  const handleCheckboxChange = () => {
    if (isChecked) {
      // Reset the map and input

      setAddress("");
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <div className="curr_location">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label>Use Current Location</label>
      </div>
      <MapContainer
        center={[27.7172, 85.324]}
        zoom={15}
        style={{ height: "300px", width: "100%", borderRadius: "2vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker
          handleMapClick={handleMapClick}
          handleMapDrag={handleMapDrag}
          location={location}
        />
        <UpdateMapCenter location={location} />
      </MapContainer>
      <div className="suggestion_component">
        <input
          value={address}
          onChange={handleInputChange}
          className="suggestion_input"
          placeholder="Search location..."
        />
        {suggestions.length > 0 && (
          <ul className="suggestionlistbox">
            {suggestions.map((suggestion, index) => (
              <li
                className="suggestionlistbox_lists"
                key={index}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div>{suggestion.name}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default GeoNavigatorMap;
