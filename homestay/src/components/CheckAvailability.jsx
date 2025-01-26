import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaCirclePlus, FaCircleMinus, FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext"; // Import useStore
import "react-datepicker/dist/react-datepicker.css";
import "../styles/CheckAvailability.scss";

const CheckAvailability = () => {
  const {
    handleSuggestionSelect,
    fetchSuggestion,
    address,
    setAddress,
    setLocation,
    suggestions,
  } = useStore(); // Use context for address and suggestions
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [guests, setGuests] = useState(1);
  const [inputGiven, setInputGiven] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAddress("");
    setLocation({ lat: null, lng: null });
  }, []);

  const today = new Date();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value); // Update address in the context
    fetchSuggestion(value); // Fetch suggestions as the user types
    setInputGiven(!!value.trim()); // Set inputGiven to true if there's input
  };

  const handleDateChange = (date, type) => {
    if (type === "checkin") setCheckin(date);
    if (type === "checkout") setCheckout(date);
  };

  const handleGuestChange = (count) => {
    if (count === "increase") setGuests(guests + 1);
    if (count === "decrease" && guests > 1) setGuests(guests - 1);
  };

  return (
    <>
      <div className="availability">
        <div className="availability_left">
          <div className="availability_left_top">
            <FaLocationDot />
            <input
              className="availability_left_top_input"
              type="text"
              value={address}
              placeholder="Where are you going?"
              onChange={handleInputChange}
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="suggestionlistbox">
              {suggestions.map((suggestion, index) => (
                <li
                  className="suggestionlistbox_lists"
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <div>{suggestion.name}</div>
                </li>
              ))}
            </ul>
          )}

          <div className="availability_left_bottom">
            <div className="availability_left_bottom_dateinput">
              <label>CHECK IN</label>
              <DatePicker
                selected={checkin}
                placeholderText="dd MMM, yyyy"
                onChange={(date) => handleDateChange(date, "checkin")}
                dateFormat="dd MMM, yyyy"
                className="availability_left_bottom_dateinput_datepicker"
                minDate={today}
              />
            </div>
            <div className="availability_left_bottom_dateinput">
              <label>CHECK OUT</label>
              <DatePicker
                selected={checkout}
                placeholderText="dd MMM, yyyy"
                dateFormat="dd MMM, yyyy"
                onChange={(date) => handleDateChange(date, "checkout")}
                minDate={checkin}
                className="availability_left_bottom_dateinput_datepicker"
              />
            </div>
            <div className="availability_left_bottom_guestinput">
              <label>GUESTS</label>
              <div className="counter">
                {guests > 0 && (
                  <>
                    <FaCircleMinus
                      onClick={() => handleGuestChange("decrease")}
                    />
                    <span>{guests}</span>
                  </>
                )}
                <FaCirclePlus onClick={() => handleGuestChange("increase")} />
              </div>
            </div>
          </div>
        </div>
        <div className="availability_right">
          <button
            className="availability_right_buttonbox_button"
            disabled={!inputGiven}
            onClick={() => {
              if (inputGiven) navigate("/room");
            }}
          >
            Check Availability
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckAvailability;
