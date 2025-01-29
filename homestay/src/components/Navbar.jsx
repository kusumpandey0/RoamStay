import React, { useState } from "react";
import "../styles/newNavbar.scss";
import { Link, NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useStore } from "../Context/StoreContext";

const Navbar = () => {
  const [dropdownClick, setDropdownClick] = React.useState(false);
  const { jwtUserDetails, setJwtUserDetails } = useStore();

  const handleLogout = () => {
    setJwtUserDetails(null);
    setDropdownClick(false); // Close the dropdown
    console.log("User logged out");
  };
  return (
    <>
      <div className="top">
        <div className="top_left">
          {/* Logo */}
          <img className="top_img" src="/logo.png" alt="logo" />

          {/* Become a Guest */}
          <Link to="/" className="top_hostregister">
            Become a Guest
          </Link>
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
              <NavLink className="dropdownlist_loginlink" to="/">
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
    </>
  );
};

export default Navbar;
