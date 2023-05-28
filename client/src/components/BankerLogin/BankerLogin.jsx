import React, { useState } from "react";
import axios from "axios";
import "./banker-login.css";
import { useNavigate } from "react-router-dom";

const url = 'https://blush-barracuda-shoe.cyclic.app';

const BankerLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${url}/api/login`, {
                username,
                password,
            });

            const { token } = response.data.data;
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("accessToken", token);
            navigate("/all-transactions");
        } catch (error) {
            console.error("Login failed", error);
            alert(error.response.data.message);
        }
    };

    const navigateToSignup = () => {
        navigate("/banker-signup");
    };

    return (
        <div className="login-container">
            <h2>Banker Login</h2>
            <form className="login-form">
                <label htmlFor="username">Username/Email:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="button" onClick={handleLogin}>
                    Login
                </button>

                <button type="button" onClick={navigateToSignup}>
                    New Banker! Sign Up
                </button>
            </form>
        </div>
    );
};

export default BankerLogin;
