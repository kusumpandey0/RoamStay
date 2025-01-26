import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context
const StoreContext = createContext();

// Custom hook to use the context
export const useStore = () => {
  return useContext(StoreContext);
};

// Provider component that wraps your app and provides context values
export const StoreProvider = ({ children }) => {
  const url = "https://localhost:3001";
  const [location, setLocation] = useState({ lat: "27.7103", lng: "85.3222" });
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menu, setMenu] = useState("");
  const [token, setToken] = useState(null);
  const [jwtUserDetails, setJwtUserDetails] = useState(null);
  const [photos, setPhotos] = useState([]);
  console.log(token);
  // const fetchUserDetails = () => {
  //   try {
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log("token", token);
    if (savedToken) {
      setToken(savedToken);
      const decode = jwtDecode(savedToken);
      console.log("decoded", decode);
      decode && setJwtUserDetails(decode);
      // fetchUserDetails();
    }
  }, [token]);
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
      console.error("Error fetching suggestions:", error);
    }
  };
  const handleSuggestionSelect = (suggestion) => {
    setLocation({ lat: suggestion.lat, lng: suggestion.lng });
    setAddress(suggestion.name);
    setSuggestions([]);
  };

  // Return the provider with state values
  return (
    <StoreContext.Provider
      value={{
        handleSuggestionSelect,
        fetchSuggestion,
        location,
        setLocation,
        address,
        setAddress,
        suggestions,
        setSuggestions,
        menu,
        setMenu,
        token,
        setToken,
        jwtUserDetails,
        setJwtUserDetails,
        photos,
        setPhotos,
        url,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
