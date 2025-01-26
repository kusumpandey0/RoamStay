import React from "react";
import "../styles/Footer.scss";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer_top">
          <img className="footer_top_logo" src="../public/logo.png" />
          <div className="footer_top_socials">
            <FaFacebookSquare />
            <FaInstagram />
            <FaTwitterSquare />
          </div>
        </div>
        <div className="footer_bottom">
          <div className="footer_bottom_info">
            <IoLocationSharp className="footer_bottom_info_icon" />
            Gongabu,Kathmandu
          </div>
          <div className="footer_bottom_info">
            <FaPhoneAlt className="footer_bottom_info_icon" />
            +977-9800000000
          </div>
          <div className="footer_bottom_info">
            <IoMdMail className="footer_bottom_info_icon" />
            roamstay@gmail.com
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
