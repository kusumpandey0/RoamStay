import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import "../styles/Signup.scss";
import {
  MdOutlineFileUpload,
  MdClose,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md"; // Import Close and Eye icons
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewNavbar from "../components/NewNavbar";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    profileimage: null,
  });

  const [pwdmatch, setPwdmatch] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility state
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Confirm password visibility state

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileimage" ? files[0] : value,
    });
  };

  useEffect(() => {
    setPwdmatch(
      formData.password === formData.confirmpassword ||
        formData.confirmpassword === ""
    );
  }, [formData.password, formData.confirmpassword]);

  const validate = () => {
    let formErrors = {};
    if (!formData.firstname.trim()) {
      formErrors.firstname = "firstname Required *";
    } else if (!/^[a-zA-Z]{2,15}$/.test(formData.firstname)) {
      formErrors.firstname = "Invalid firstname";
    }

    if (!formData.lastname.trim()) {
      formErrors.lastname = "lastname Required *";
    } else if (!/^[a-zA-Z]{2,15}$/.test(formData.lastname)) {
      formErrors.lastname = "Invalid firstname";
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is Required *";
    } else if (
      !/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(
        formData.email
      )
    ) {
      formErrors.email = "Incorrect email format ";
    }

    if (!formData.phonenumber.trim()) {
      formErrors.phonenumber = "Phone number is Required *";
    } else if (!/^(98|97|96)[0-9]{8}$/.test(formData.phonenumber)) {
      formErrors.phonenumber = "Invalid phone Number";
    }

    if (!formData.password.trim()) {
      formErrors.password = "Password Is required *";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/.test(
        formData.password
      )
    ) {
      formErrors.password =
        "Use atleast a uppercase,lowercase,a digit and a symbol.Password should be atleast 8 characters long. ";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      try {
        const register_form = new FormData();

        // Append formData values to FormData object
        for (let key in formData) {
          register_form.append(key, formData[key] || "");
        }

        // Axios POST request
        const response = await axios.post(
          "http://localhost:3001/api/auth/signup",
          register_form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", response.data);

        if (response.status === 200) {
          toast.success("User registered successfully!");
          // Delay navigation to login page to show toast first
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (err) {
        if (err.response) {
          toast.error(
            `Registration failed: ${
              err.response.data.message || "Unknown error"
            }`
          );
          console.log("Error:", err.response.data);
        } else {
          toast.error(`Registration failed: ${err.message}`);
          console.log("Error:", err.message);
        }
      }
    }
  };

  const handleRemoveProfileImage = () => {
    setFormData({ ...formData, profileimage: null });
  };

  return (
    <>
      <NewNavbar />
      <div className="register">
        <div className="register_content">
          <div>
            <img
              src="../../public/logo.png"
              style={{ height: "90px", width: "120px" }}
              alt="Logo"
            />
          </div>
          <form className="register_content_form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            {error.firstname && <p className="error">{error.firstname}</p>}
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            {error.lastname && <p className="error">{error.lastname}</p>}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleInputChange}
            />
            {error.email && <p className="error">{error.email}</p>}
            <input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleInputChange}
            />
            {error.phonenumber && <p className="error">{error.phonenumber}</p>}
            <div className="password-field">
              <input
                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {error.password && <p className="error">{error.password}</p>}
              <div
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
              >
                {passwordVisible ? <MdVisibility /> : <MdVisibilityOff />}
              </div>
            </div>
            <div className="password-field">
              <input
                type={confirmPasswordVisible ? "text" : "password"} // Toggle confirm password visibility
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleInputChange}
              />
              <div
                className="eye-icon"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                } // Toggle visibility
              >
                {confirmPasswordVisible ? (
                  <MdVisibility />
                ) : (
                  <MdVisibilityOff />
                )}
              </div>
            </div>
            {!pwdmatch && (
              <p style={{ color: "red" }}>Passwords do not match</p>
            )}
            <input
              id="profilepic"
              type="file"
              name="profileimage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleInputChange}
            />
            {formData.profileimage && (
              <div className="profile-image-preview">
                <img
                  style={{ maxHeight: "100px", maxWidth: "80px" }}
                  src={URL.createObjectURL(formData.profileimage)}
                  alt="Preview"
                />
                <MdClose
                  className="remove-image-icon"
                  onClick={handleRemoveProfileImage}
                />
              </div>
            )}
            <label
              htmlFor="profilepic"
              className={
                formData.profileimage === null ? "labelbefore" : "labelafter"
              }
            >
              <MdOutlineFileUpload className="uploadicon" />
              <p>Upload profile photo</p>
            </label>
            <button type="submit" disabled={!pwdmatch}>
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <a href="/login">Log In Here</a>
          </p>
        </div>

        {/* Toastify Container for displaying toasts */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
