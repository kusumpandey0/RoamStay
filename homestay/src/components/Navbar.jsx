import React, { useState } from "react";
import "../styles/Navbar.scss";
import { IoSearch } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((state) => state.user);
  const handleDropdown = () => {
    dropdown ? setDropdown(false) : setDropdown(true);
  };
  return (
    <>
      <div className="navbar">
        <a href="#">
          <img src="../public/logo.png" alt="logo" className="navbar_logo" />
        </a>
        <div className="navbar_search">
          <input type="text" placeholder="search..." />
          <IoSearch />
        </div>
        <div className="navbar_right">
          <div className="hosts">
            {user ? (
              <a href="/create-listing">Become a host</a>
            ) : (
              <a href="/login">Become a host</a>
            )}
          </div>
          <button
            className="navbar_right_account"
            onClick={() => handleDropdown()}
          >
            <IoMenu />
            <FaUser />
          </button>
          {dropdown && !user && (
            <div className="navbar_right_accountmenu">
              <Link to="/login">Log In</Link>
              <Link to="/register">Sign Up</Link>
            </div>
          )}

          {dropdown && user && (
            <div className="navbar_right_accountmenu">
              <Link to={`/${user._id}/trips`}>Trip List</Link>
              <Link to={`/${user._id}/wishList`}>Wish List</Link>
              <Link to={`/${user._id}/properties`}>Property List</Link>
              <Link to={`/${user._id}/reservations`}>Reservation List</Link>

              <Link>Log Out</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
