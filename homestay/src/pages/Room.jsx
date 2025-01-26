// import React, { useState } from "react";
// import GeoNavigatorMap from "../components/GeoNavigatorMap.jsx";
// import NewNavbar from "../components/NewNavbar.jsx";
// import RoomCard from "../components/RoomCard.jsx";
// import { useStore } from "../Context/StoreContext.jsx";
// import "../styles/Room.scss";

// const Room = () => {
//   const { setMenu } = useStore();
//   const [filters, setFilters] = useState({
//     distance: [],
//     priceRange: [0, 500],
//     roomType: "",
//     amenities: [],
//     rating: 0,
//   });

//   setMenu("room");

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const roomList = [
//     {
//       id: 1,
//       title: "Cozy Single Room",
//       price: 100,
//       rating: 4.5,
//       distance: 2,
//       image: "room1.jpg",
//     },
//     {
//       id: 2,
//       title: "Luxury Suite",
//       price: 300,
//       rating: 4.8,
//       distance: 5,
//       image: "room2.jpg",
//     },
//     // Add more room objects as needed
//   ];

//   const filteredRooms = roomList.filter((room) => {
//     const { distance, priceRange, rating } = filters;
//     return (
//       (!distance.length || distance.includes(room.distance)) &&
//       room.price >= priceRange[0] &&
//       room.price <= priceRange[1] &&
//       room.rating >= rating
//     );
//   });

//   return (
//     <>
//       <NewNavbar />
//       <div className="rooms">
//         {/* Filters Section */}
//         <div className="rooms_filters">
//           <GeoNavigatorMap />
//           <h4>Filters</h4>

//           {/* Distance Filter */}
//           <div className="filter_group">
//             <h5>Distance</h5>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleFilterChange("distance", [2])}
//               />
//               Less than 2km
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleFilterChange("distance", [2, 5])}
//               />
//               2 to 5km
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleFilterChange("distance", [5, 10])}
//               />
//               5 to 10km
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleFilterChange("distance", [10])}
//               />
//               More than 10km
//             </label>
//           </div>

//           {/* Price Range Filter */}
//           <div className="filter_group">
//             <h5>Price Range</h5>
//             <input
//               type="range"
//               min="0"
//               max="500"
//               step="10"
//               value={filters.priceRange[1]}
//               onChange={(e) =>
//                 handleFilterChange("priceRange", [0, Number(e.target.value)])
//               }
//             />
//             <p>Up to ${filters.priceRange[1]}</p>
//           </div>

//           {/* Room Type Filter */}
//           <div className="filter_group">
//             <h5>Room Type</h5>
//             <select
//               onChange={(e) => handleFilterChange("roomType", e.target.value)}
//             >
//               <option value="">Any</option>
//               <option value="single">Single Room</option>
//               <option value="double">Double Room</option>
//               <option value="suite">Suite</option>
//             </select>
//           </div>

//           {/* Rating Filter */}
//           <div className="filter_group">
//             <h5>Rating</h5>
//             <input
//               type="number"
//               min="0"
//               max="5"
//               step="0.5"
//               value={filters.rating}
//               onChange={(e) =>
//                 handleFilterChange("rating", Number(e.target.value))
//               }
//             />
//             <p>Minimum Rating: {filters.rating}</p>
//           </div>
//         </div>

//         {/* Room Cards Section */}
//         <div className="rooms_cards">
//           {filteredRooms.map((room) => (
//             <RoomCard key={room.id} room={room} />
//           ))}
//           {!filteredRooms.length && (
//             <p>No rooms found with the selected filters.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Room;
import React, { useState } from "react";
import "../styles/Room.scss";
import NewNavbar from "../components/NewNavbar";
import GeoNavigatorMap from "../components/GeoNavigatorMap";

const roomsData = [
  {
    id: 1,
    photos: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    name: "Deluxe Room",
    category: "Luxury",
    type: "Single",
    amenities: ["WiFi", "TV", "Air Conditioning"],
    price: 200,
    distance: 3,
    rating: 4.5,
  },
  {
    id: 2,
    photos: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    name: "Family Room",
    category: "Budget",
    type: "Double",
    amenities: ["WiFi", "Kitchen"],
    price: 150,
    distance: 6,
    rating: 4.0,
  },
];

const Room = () => {
  const [filters, setFilters] = useState({
    distance: null,
    price: 500,
    roomType: "Any",
    minRating: 0,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRooms = roomsData.filter((room) => {
    return (
      (!filters.distance || room.distance <= filters.distance) &&
      room.price <= filters.price &&
      (filters.roomType === "Any" || room.type === filters.roomType) &&
      room.rating >= filters.minRating
    );
  });

  return (
    <>
      <NewNavbar />
      <div className="room-filter">
        {/* Filters Section */}
        <div className="filters">
          <h2>Filters</h2>
          <GeoNavigatorMap />
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                handleFilterChange("distance", e.target.checked ? 2 : null)
              }
            />
            Less than 2km
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                handleFilterChange("distance", e.target.checked ? 5 : null)
              }
            />
            2 to 5km
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                handleFilterChange("distance", e.target.checked ? 10 : null)
              }
            />
            5 to 10km
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                handleFilterChange("distance", e.target.checked ? 15 : null)
              }
            />
            More than 10km
          </label>

          <label>
            <span>Price Range: Up to ${filters.price}</span>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.price}
              onChange={(e) => handleFilterChange("price", e.target.value)}
            />
          </label>

          <label>
            <span>Room Type</span>
            <select
              onChange={(e) => handleFilterChange("roomType", e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
            </select>
          </label>

          <label>
            <span>Minimum Rating: {filters.minRating}</span>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.minRating}
              onChange={(e) => handleFilterChange("minRating", e.target.value)}
            />
          </label>
        </div>

        {/* Room List Section */}
        <div className="room-list">
          {filteredRooms.map((room) => (
            <div key={room.id} className="room">
              {/* Photos Section */}
              <div className="photos">
                {room.photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Room ${index}`} />
                ))}
              </div>

              {/* Info Section */}
              <div className="info">
                <h3>{room.name}</h3>
                <p>Category: {room.category}</p>
                <p>Type: {room.type}</p>
                <p>Amenities: {room.amenities.join(", ")}</p>
                <p>Rating: {room.rating} ⭐</p>
              </div>

              {/* Price Section */}
              <div className="price">
                <p>${room.price}/night</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Room;
