import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import CreateListing from "./pages/CreateListing.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import TravelGuide from "./pages/TravelGuide";
import Destination from "./pages/Destination";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="/travelguides" element={<TravelGuide />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
