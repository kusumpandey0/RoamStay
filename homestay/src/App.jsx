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
import WishList from "./pages/WishList";
import ProtectedRouteUser from "./components/ProtectedRouteUser.jsx";
import ProtectedRoute from "./components/ProtectedRouteUser.jsx";
import SingleProperty from "./pages/SingleProperty.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<ProtectedRouteUser><Room /></ProtectedRouteUser>} />
          <Route path="/createlisting" element={<ProtectedRouteUser><CreateListing /></ProtectedRouteUser>} />
          <Route path="/property/:id" element={<ProtectedRouteUser><SingleProperty/></ProtectedRouteUser>} />

          <Route path="/travelguides" element={<ProtectedRouteUser><TravelGuide /></ProtectedRouteUser>} />
          <Route path="/destinations" element={<ProtectedRouteUser><Destination/></ProtectedRouteUser>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin' element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout/>
            </ProtectedRoute>
            }>
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
