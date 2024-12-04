import React, { useState } from "react";
import "../styles/newNavbar.scss";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdArrowDropDownCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const NewNavbar = () => {
  const [dropdownclick, setDropdownclick] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Clear user data from Redux store
  };
  return (
    <>
      <div className="top">
        <div className="top_left">
          <h3>Hello,user!</h3>

          <img className="top_img" src="../public/logo.png" alt="logo" />

          <Link to="#" className="top_hostregister">
            Become a host
          </Link>
        </div>
        <div
          className="top_dropdownmenu"
          onClick={() => {
            dropdownclick ? setDropdownclick(false) : setDropdownclick(true);
          }}
        >
          <FaCircleUser className="top_dropdownmenu_usericon" />
          <MdArrowDropDownCircle className="top_dropdownmenu_downarrowicon" />
        </div>
        {dropdownclick && !user && (
          <div className="dropdownlist">
            <Link className="dropdownlist_loginlink" to="/login">
              Log In
            </Link>
            <hr></hr>
            <Link className="dropdownlist_loginlink" to="/signup">
              Sign Up
            </Link>
            <hr></hr>
          </div>
        )}
        {dropdownclick && user && (
          <div className="dropdownlist">
            <Link
              className="dropdownlist_loginlink"
              to="#"
              onClick={handleLogout}
            >
              Log Out
            </Link>
            <hr></hr>
            <Link className="dropdownlist_loginlink" to="/signup">
              Sign Up
            </Link>
            <hr></hr>
          </div>
        )}
      </div>
      <hr></hr>
      <div className="navbar">
        <Link className="navbar_links" to="#">
          About Us
        </Link>
        <Link className="navbar_links" to="#">
          Destinations
        </Link>
        <Link className="navbar_links" to="#">
          Rooms
        </Link>
        <Link className="navbar_links" to="#">
          Trail booking
        </Link>
        <Link className="navbar_links" to="#">
          Travel guides
        </Link>
      </div>
    </>
  );
};

export default NewNavbar;
