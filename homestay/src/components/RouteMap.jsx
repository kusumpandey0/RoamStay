// import React, { useState, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import { FaSearch } from 'react-icons/fa';
// import axios from 'axios';

// // Fix for default marker icon
// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// const SearchControl = ({ onLocationSelect }) => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const map = useMap();

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         if (!searchQuery.trim()) return;

//         setIsLoading(true);
//         try {
//             const response = await axios.get(
//                 `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}+Nepal`
//             );
//             setSearchResults(response.data);
//         } catch (error) {
//             console.error('Search failed:', error);
//         }
//         setIsLoading(false);
//     };

//     const handleLocationSelect = (location) => {
//         const lat = parseFloat(location.lat);
//         const lng = parseFloat(location.lon);

//         map.flyTo([lat, lng], 15);
//         onLocationSelect({ lat, lng });
//         setSearchResults([]);
//         setSearchQuery('');
//     };

//     return (
//         <div className="map-search-container">
//             <form onSubmit={handleSearch} className="search-form">
//                 <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search location..."
//                     className="search-input"
//                 />
//                 <button type="submit" className="search-button" disabled={isLoading}>
//                     <FaSearch />
//                 </button>
//             </form>

//             {searchResults.length > 0 && (
//                 <div className="search-results">
//                     {searchResults.map((result) => (
//                         <div
//                             key={result.place_id}
//                             className="search-result-item"
//                             onClick={() => handleLocationSelect(result)}
//                         >
//                             {result.display_name}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// const MapEvents = ({ onLocationSelect }) => {
//     const map = useMap();

//     map.on('click', (e) => {
//         const { lat, lng } = e.latlng;
//         onLocationSelect({ lat, lng });
//     });

//     return null;
// };

// const RouteMap = ({ onLocationSelect, marker }) => {
//     const defaultPosition = [27.7172, 85.3240]; // Kathmandu

//     return (
//         <div className="route-map-container">
//             <MapContainer
//                 center={defaultPosition}
//                 zoom={13}
//                 style={{ height: '400px', width: '100%', borderRadius: '8px' }}
//             >
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <SearchControl onLocationSelect={onLocationSelect} />
//                 <MapEvents onLocationSelect={onLocationSelect} />
//                 {marker && (
//                     <Marker position={[marker.lat, marker.lng]} />
//                 )}
//             </MapContainer>
//         </div>
//     );
// };

// export default RouteMap;
import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/RouteMap.scss";

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

const RouteMap = ({ onLocationSelect, isStart }) => {
    const [routeLocation, setRouteLocation] = useState({
        lat: "",
        lng: "",
    });
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

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
        setRouteLocation({ lat: suggestion.lat, lng: suggestion.lng });
        setAddress(suggestion.name);
        setSuggestions([]);
        onLocationSelect({ lat: suggestion.lat, lng: suggestion.lng }, suggestion.name);
    };

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setRouteLocation({ lat, lng });
        fetchAddress(lat, lng).then(addr => {
            onLocationSelect({ lat, lng }, addr);
        });
    };

    const handleMapDrag = (ev) => {
        const { lat, lng } = ev.target._latlng;
        setRouteLocation({ lat, lng });
        fetchAddress(lat, lng).then(addr => {
            onLocationSelect({ lat, lng }, addr);
        });
    };

    useEffect(() => {
        if (isChecked && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((place) => {
                const { latitude, longitude } = place.coords;
                setRouteLocation({ lat: latitude, lng: longitude });
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
            return data.display_name;
        } catch (error) {
            console.error("Error fetching address:", error);
            return "";
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
                    location={routeLocation}
                />
                <UpdateMapCenter location={routeLocation} />
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

export default RouteMap;
