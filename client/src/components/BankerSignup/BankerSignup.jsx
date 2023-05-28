import React, { useState } from "react";
import axios from "axios";
import "./banker-signup.css";
import { useNavigate } from "react-router-dom";

const url = 'https://blush-barracuda-shoe.cyclic.app';

const BankerSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${url}/api/signup`, {
        username,
        email,
        password,
        role: "Banker"
      });

      const { token } = response.data.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("accessToken", token);
      navigate("/banker-login");
    } catch (error) {
      console.error("Signup failed", error);
      alert(error.response.data.message);
    }
  };

  const navigateToLogin = () => {
    navigate("/banker-login");
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password should be at least 8 characters long and contain at least one letter and one number.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          required
        />

        {passwordError && <p className="password-error">{passwordError}</p>}

        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>

        <button type="button" onClick={navigateToLogin}>
          Existing Banker? Login
        </button>
      </form>
    </div>
  );
};

export default BankerSignUp;
