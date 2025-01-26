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
const Address = () => {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLocation({ lat, lng });
    fetchAddress(lat, lng);
  };
  const handleMapDrag = (ev) => {
    console.log("hiiii", ev);
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
  const handleInputChange = (e) => {
    const query = e.target.value;
    setAddress(query);
    fetchSuggestion(query);
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
  const handleSuggestionSelect = (suggestion) => {
    setLocation({ lat: suggestion.lat, lng: suggestion.lng });
    setAddress(suggestion.name);
    setSuggestions([]);
  };
  return (
    <>
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
        style={{ width: "100%" }}
        value={address}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                handleSuggestionSelect(suggestion);
              }}
            >
              <div>{suggestion.name}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Address;
