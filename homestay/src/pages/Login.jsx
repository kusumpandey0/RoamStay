import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "../styles/Login.scss";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import eye icons
import NewNavbar from "../components/NewNavbar";
import { useStore } from "../Context/StoreContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const { token, setToken } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      // Axios POST request
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response);

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", user.role);
          setToken(token);
          toast.success("Login successful! Welcome back.");

          // Delay navigation to home after the toast duration (1000ms)
          setTimeout(() => {
            if (user.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 1000);
        } else {
          console.log("Error: Missing token or user in response");
          toast.error("Login failed: Missing token or user.");
        }
      }
    } catch (err) {
      // Handle errors from the API
      if (err.response) {
        console.log(
          "Login Failed:",
          err.response.data.message || "Unknown error"
        );
        toast.error(
          `Login failed: ${err.response.data.message || "Unknown error"}`
        );
      } else {
        console.log("Login Failed:", err.message);
        toast.error(`Login failed: ${err.message}`);
      }
    }
  };

  return (
    <>
      <NewNavbar />
      <div className="login">
        <div className="login_content">
          <div>
            <img
              src="../../public/logo.png"
              style={{ height: "90px", width: "120px" }}
              alt="Logo"
            />
          </div>
          <form className="login_content_form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-field">
              <input
                type={passwordVisible ? "text" : "password"} // Change input type based on visibility
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="eye-icon"
                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
              >
                {passwordVisible ? <MdVisibility /> : <MdVisibilityOff />}
              </div>
            </div>
            <button type="submit">Log In</button>
          </form>
          <p>
            Don't Have An Account?<Link to="/signup">Sign Up Here</Link>
          </p>
        </div>
      </div>

      {/* ToastContainer to display notifications */}
      <ToastContainer />
    </>
  );
};

export default Login;
