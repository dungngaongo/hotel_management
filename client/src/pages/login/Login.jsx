import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/"); // Redirect to homepage or dashboard
    } catch (err) {
      console.error(err);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data?.details || "An error occurred",
      });
    }
  };

  // Disable the login button if either username or password is empty or loading
  const isDisabled = !credentials.username || !credentials.password || loading;

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          value={credentials.username}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          value={credentials.password}
          className="lInput"
        />
        <button
          disabled={isDisabled}
          onClick={handleClick}
          className="lButton"
        >
          Login
        </button>
        {error && <span className="errorMessage">{error}</span>}
      </div>
    </div>
  );
};

export default Login;
