import React, { useEffect, useState } from "react";
import "../styles/Signup.scss";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileimage: null,
  });
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileimage" ? files[0] : value,
    });
  };
  console.log(formData);
  const [pwdmatch, setPwdmatch] = useState(true);
  useEffect(() => {
    setPwdmatch(
      formData.password === formData.confirmpassword ||
        formData.confirmpassword === ""
    );
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();
      for (var key in formData) {
        register_form.append(key, formData[key]);
      }
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        body: register_form,
      });
      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("registration failed", err.message);
    }
  };
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            required
          />
          {!pwdmatch && <p>pwd not match</p>}
          <input
            id="profilepic"
            type="file"
            name="profileimage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />

          {formData.profileimage && (
            <img
              style={{ maxHeight: "100px", maxWidth: "80px" }}
              src={URL.createObjectURL(formData.profileimage)}
            />
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
          Already have an account?<a>Log In Here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
