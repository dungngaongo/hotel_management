// src/pages/register/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message on form submission

    // Client-side validation
    if (!inputs.username || !inputs.password || !inputs.email || !inputs.phone) {
      setError("All required fields must be filled!");
      return;
    }

    // Email validation
    // const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // if (!emailPattern.test(inputs.email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }

    // Password validation
    if (inputs.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await axios.post("/auth/register", inputs);
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again."); // Display error message
    }
  };

  return (
    <div className="register">
      <div className="registerContainer">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Username"
            id="username"
            value={inputs.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="First Name"
            id="first_name"
            value={inputs.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            id="last_name"
            value={inputs.last_name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            id="phone"
            value={inputs.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            value={inputs.address}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default Register;
