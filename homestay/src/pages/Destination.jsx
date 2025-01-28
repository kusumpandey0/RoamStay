import { useState } from "react";
import DestinationBox from "../components/DestinationBox";
import NewNavbar from "../components/NewNavbar";
import "../styles/Destination.scss";
import PhotoUpload from "../components/PhotoUpload";
import { useStore } from "../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const Destination = () => {
  const navigate = useNavigate();
  const { photos, url, token, destinations, fetchDestination, setPhotos } =
    useStore();

  const [newDestination, setNewDestination] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDestination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDestination = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newDestination.title);
    formData.append("description", newDestination.description);
    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    try {
      const res = await axios.post(`${url}/api/destination/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Destination added successfully");
      setNewDestination({ title: "", description: "" });
      setPhotos([]);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response) {
        toast.error(`Error: ${err.response.data.message || "Unknown error"}`);
      } else {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <>
      <NewNavbar />
      <div className="destination-page">
        <div className="destination-list">
          <h2>Explore Popular Destinations</h2>
          <div className="destination-grid">
            {destinations &&
              destinations.map((destination, index) => (
                <DestinationBox key={index} destination={destination} />
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
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Destination;
