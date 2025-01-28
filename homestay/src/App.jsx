import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";
import CreateListing from "./pages/CreateListing.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import TravelGuide from "./pages/TravelGuide";
import Destination from "./pages/Destination";
import { AdminLayout } from "./Admin/components/AdminLayout/AdminLayout.jsx";
import ManageRooms from "./Admin/pages/ManageRooms/ManageRooms.jsx";
import ManageTravelGuide from "./Admin/pages/ManageTravelGuide/ManageTravelGuide.jsx";
import ManageDestinations from "./Admin/pages/ManageDestinations/ManageDestinations.jsx";

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
          <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<ManageRooms/>}/>
            <Route path='manageTravelGuides' element={<ManageTravelGuide/>}/>
            <Route path='manageDestinations' element={<ManageDestinations/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
