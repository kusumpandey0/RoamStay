import React, { useState } from "react";
import DestinationBox from "../components/DestinationBox";
import NewNavbar from "../components/NewNavbar";
import "../styles/Destination.scss";
import PhotoUpload from "../components/PhotoUpload";
const Destination = () => {
  const [destinations, setDestinations] = useState([
    {
      title: "Pokhara",
      description: "City of lakes with stunning mountain views.",
      photo: "../../public/pokhara.jpg",
    },
    {
      title: "Kathmandu",
      description: "Ancient temples and vibrant culture in Nepal's capital.",
      photo: "../../public/kathmandu.jpg",
    },
    {
      title: "Chitwan",
      description: "National park with diverse wildlife and jungle safaris.",
      photo: "../../public/chitwan.jpg",
    },
    {
      title: "Lumbini",
      description:
        "Birthplace of Buddha with peaceful gardens and monasteries.",
      photo: "../../public/lumbini.jpg",
    },
    {
      title: "Mustang",
      description: "Hidden kingdom with dramatic landscapes and ancient caves.",
      photo: "../../public/mustang.jpg",
    },
    {
      title: "Nagarkot",
      description: "Mountain viewpoint perfect for sunrise and sunset views.",
      photo: "../../public/nagarkot.jpg",
    },
    {
      title: "Bandipur",
      description: "Preserved Newari town with traditional architecture.",
      photo: "../../public/bandipur.jpg",
    },
    {
      title: "Ilam",
      description:
        "Rolling hills covered in tea plantations and misty mornings.",
      photo: "../../public/ilam.jpg",
    },
    {
      title: "Rara Lake",
      description: "Pristine alpine lake surrounded by snow-capped peaks.",
      photo: "../../public/rara.jpg",
    },
    {
      title: "Janakpur",
      description: "Religious and cultural center with historic temples.",
      photo: "../../public/janakpur.jpg",
    },
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
      setNewDestination({ title: "", description: "", photo: "" });
    }
  };

  return (
    <>
      <NewNavbar />
      <div className="destination-page">
        <div className="destination-list">
          <h2>Explore Popular Destinations</h2>
          <div className="destination-grid">
            {destinations.map((destination, index) => (
              <DestinationBox
                key={index}
                title={destination.title}
                description={destination.description}
                photo={destination.photo}
              />
            ))}
          </div>
        </div>

        <div className="upload-form">
          <h2>Add New Destination</h2>
          <form onSubmit={handleAddDestination}>
            <div>
              <label>Destination Name</label>
              <input
                type="text"
                name="title"
                value={newDestination.title}
                onChange={handleChange}
                placeholder="Enter destination name"
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={newDestination.description}
                onChange={handleChange}
                placeholder="Write a brief description"
                required
              />
            </div>
            <div>
              <label>Photo URL</label>
              <PhotoUpload />
            </div>
            <button type="submit">Add Destination</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Destination;
