import React from "react";
import { useEffect, useState } from "react";
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

const Test = () => {
  const { address, setAddress, suggestions, setSuggestions } = useStore();
  const [location, setLocation] = useState({ lat: "27.7172", lng: "85.324" });

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((place) => {
        const { latitude, longitude } = place.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude);
      });
    }
  }, []);

  const fetchAddress = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    setAddress(data.display_name);
  };

  const fetchSuggestion = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSuggestions(
        data.map((place) => ({
          name: place.display_name,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        }))
      );
    } catch (error) {
      console.log("error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setAddress(query);
    fetchSuggestion(query);
  };

  const handleSuggestionSelect = (suggestion) => {
    setLocation({ lat: suggestion.lat, lng: suggestion.lng });
    setAddress(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div>
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
      <input
        value={address}
        onChange={handleInputChange}
        className="suggestion_input"
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
  );
};

export default Test;
