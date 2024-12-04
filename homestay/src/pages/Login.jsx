import React, { useState } from "react";
import "../styles/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const loggedIn = await response.json();
        console.log("Login Response:", loggedIn); // Debug log
        if (loggedIn.token && loggedIn.user) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/home");
        } else {
          console.log("Error: Missing token or user in response");
        }
      } else {
        const errorData = await response.json();
        console.log("Login Failed:", errorData.message || "Unknown error");
      }
    } catch (err) {
      console.log("Login Failed:", err.message);
    }
  };
  return (
    <>
      <div className="login">
        <div className="login_content">
          <form className="login_content_form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
          </form>
          <p>
            Don't Have An Account?<a>Sign Up Here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
