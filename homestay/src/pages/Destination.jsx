import { useEffect, useState } from "react";
import DestinationBox from "../components/DestinationBox";
import NewNavbar from "../components/NewNavbar";
import "../styles/Destination.scss";
import PhotoUpload from "../components/PhotoUpload";
import { useStore } from "../Context/StoreContext";
import axios from 'axios'
const Destination = () => {


  const{photos,url,token,destinations,fetchDestination}=useStore();

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

  const handleAddDestination = async(e) => {
    e.preventDefault();
    console.log(newDestination);
    console.log(photos);
    const formData=new FormData();
    formData.append("title",newDestination.title);
    formData.append("description",newDestination.description);
    photos.forEach((photo) => {
      formData.append("images", photo);
    });

    try{
        const res=await axios.post(`${url}/api/destination/create`,formData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
          )
          console.log(res);

          fetchDestination();
          
    }catch(err){
      console.log(err.response.data.error);
      
    }
      setNewDestination({ title: "", description: "", photo: "" });
    
  };
  


  return (
    <>
      <NewNavbar />
      <div className="destination-page">
        <div className="destination-list">
          <h2>Explore Popular Destinations</h2>
          <div className="destination-grid">
            {destinations&&destinations.map((destination, index) => (
              <DestinationBox
                key={index}
                destination={destination}
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
