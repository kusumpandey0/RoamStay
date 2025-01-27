import React from "react";
import "../styles/Footer.scss";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="footer_content_left">
          <img className="footer_content_left_logo" src="../public/logo.png" alt="RoamStay Logo" />
          <p>Your trusted partner for comfortable stays around Nepal.</p>
          <div className="footer_content_left_socials">
            <a href="#" aria-label="Facebook"><FaFacebookSquare /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitterSquare /></a>
          </div>
        </div>

        <div className="footer_content_right">
          <div className="footer_content_right_contact">
            <h3>Contact Us</h3>
            <div className="contact_info">
              <IoLocationSharp className="icon" />
              <span>Gongabu, Kathmandu</span>
            </div>
            <div className="contact_info">
              <FaPhoneAlt className="icon" />
              <span>+977-9800000000</span>
            </div>
            <div className="contact_info">
              <IoMdMail className="icon" />
              <span>roamstay@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>&copy; 2024 RoamStay. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
