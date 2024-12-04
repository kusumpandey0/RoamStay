import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

import "../styles/CheckAvailability.scss";
const CheckAvailability = () => {
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [guests, setGuests] = useState(0);
  const handleDateChange = (date, type) => {
    if (type === "checkin") setCheckin(date);
    if (type === "checkout") setCheckout(date);
  };
  const handleGuestChange = (count) => {
    if (count === "increase") setGuests(guests + 1);
    if (count === "decrease" && guests > 0) setGuests(guests - 1);
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <div className="availability">
        <div className="availability_dateinput">
          <label>CHECK IN</label>
          <DatePicker
            selected={checkin}
            placeholderText="dd MMM, yyyy"
            onChange={(date) => handleDateChange(date, "checkin")}
            dateFormat="dd MMM, yyyy"
            className="availability_dateinput_datepicker"
            minDate={today}
          ></DatePicker>
          <RiArrowDropDownLine className="availability_dateinput_down" />
        </div>
        <div className="availability_dateinput">
          <label>CHECK OUT</label>
          <DatePicker
            selected={checkout}
            placeholderText="dd MMM, yyyy"
            dateFormat="dd MMM, yyyy"
            onChange={(date) => handleDateChange(date, "checkout")}
            minDate={checkin}
            className="availability_dateinput_datepicker"
          ></DatePicker>
          <RiArrowDropDownLine className="availability_dateinput_down" />
        </div>
        <div className="availability_guestinput">
          <label>GUESTS</label>
          <div className="counter">
            {guests > 0 && (
              <>
                <FaCircleMinus onClick={() => handleGuestChange("decrease")} />
                <span>{guests}</span>
              </>
            )}
            <FaCirclePlus onClick={() => handleGuestChange("increase")} />
          </div>
        </div>
        <div className="availability_buttonbox">
          <button className="availability_buttonbox_button">
            Check Availability
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckAvailability;
