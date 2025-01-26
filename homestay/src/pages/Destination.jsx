import React, { useState } from "react";
import DestinationBox from "../components/DestinationBox";
import NewNavbar from "../components/NewNavbar";
import "../styles/Destination.scss";

const Destination = () => {
  const [destinations, setDestinations] = useState([
    {
      title: "Paris",
      description: "A romantic city with beautiful architecture.",
      photo: "https://via.placeholder.com/150",
    },
    {
      title: "New York",
      description: "The city that never sleeps, full of energy.",
      photo: "https://via.placeholder.com/150",
    },
    // Add more destinations as needed
  ]);

  const [newDestination, setNewDestination] = useState({
    title: "",
    description: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDestination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDestination = (e) => {
    e.preventDefault();
    if (
      newDestination.title &&
      newDestination.description &&
      newDestination.photo
    ) {
      setDestinations((prevDestinations) => [
        ...prevDestinations,
        newDestination,
      ]);
      setNewDestination({ title: "", description: "", photo: "" }); // Reset the form
    }
  };

  return (
    <>
      <NewNavbar />
      <div className="destination-page">
        <div className="destination-list">
          <h2>Explore Destinations</h2>
          {destinations.map((destination, index) => (
            <DestinationBox />
          ))}
        </div>

        <div className="upload-form">
          <h2>Upload a New Destination</h2>
          <form onSubmit={handleAddDestination}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newDestination.title}
                onChange={handleChange}
                placeholder="Enter destination title"
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={newDestination.description}
                onChange={handleChange}
                placeholder="Enter destination description"
                required
              />
            </div>
            <div>
              <label>Photo URL:</label>
              <input
                type="text"
                name="photo"
                value={newDestination.photo}
                onChange={handleChange}
                placeholder="Enter photo URL"
                required
              />
            </div>
            <button type="submit">Add Destination</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Destination;
