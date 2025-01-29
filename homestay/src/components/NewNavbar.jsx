import React from "react";
import "../styles/newNavbar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useStore } from "../Context/StoreContext"; // Assuming you're using context for state management
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const NewNavbar = () => {
  const navigate = useNavigate();
  const [dropdownClick, setDropdownClick] = React.useState(false);
  const { jwtUserDetails, setJwtUserDetails } = useStore();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setJwtUserDetails(null);
    setDropdownClick(false); // Close the dropdown
    console.log("User logged out");
  };

  return (
    <>
      <div className="top">
        <div className="top_left">
          <h3>Hello, {jwtUserDetails?.firstname || "user"}!</h3>
          <img
            className="top_img"
            src="/logo.png"
            alt="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          {jwtUserDetails ? (
            <NavLink to="/createlisting" className="top_hostregister">
              Become a host
            </NavLink>
          ) : (
            <NavLink to="/login" className="top_hostregister">
              Become a host
            </NavLink>
          )}
        </div>

        <div
          className="top_dropdownmenu"
          onClick={() => setDropdownClick(!dropdownClick)}
        >
          <FaCircleUser className="top_dropdownmenu_usericon" />
          <MdArrowDropDownCircle className="top_dropdownmenu_downarrowicon" />
        </div>

        <div className={`dropdownlist ${dropdownClick ? "active" : ""}`}>
          {jwtUserDetails ? (
            <div>
              <NavLink
                className="dropdownlist_loginlink"
                to="/wishlist"
                style={{
                  color:
                    location.pathname === "/wishlist" ? "#ff0000" : "inherit",
                }}
              >
                Wish List
              </NavLink>
              <hr />

              <NavLink
                className="dropdownlist_loginlink"
                to="/login"
                onClick={handleLogout}
              >
                Log Out
              </NavLink>
              <hr />
            </div>
          ) : (
            <div>
              <NavLink className="dropdownlist_loginlink" to="/login">
                Log In
              </NavLink>
              <hr />
              <NavLink className="dropdownlist_loginlink" to="/signup">
                Sign Up
              </NavLink>
              <hr />
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="navbar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar_active" : "navbar_links"
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar_active" : "navbar_links"
          }
          to="/destinations"
        >
          Destinations
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar_active" : "navbar_links"
          }
          to="/room"
        >
          Rooms
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar_active" : "navbar_links"
          }
          to="/travelguides"
        >
          Travel Guides
        </NavLink>
      </div>

      <ToastContainer />
    </>
  );
};

export default NewNavbar;
