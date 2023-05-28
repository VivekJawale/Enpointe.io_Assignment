import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const url = 'https://blush-barracuda-shoe.cyclic.app';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${url}/api/login`, {
                username,
                password,
            });

            console.log(response);

            const accessToken = response.data.data.token;

            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("cusId", response.data.data.user._id)

            navigate("/user-transaction")

        } catch (error) {
            console.error("Login failed", error);
            alert(error.response.data.message)

        }
    };

    const navigateToSignup = () => {
        navigate("/cus-signup");
    };

    return (
        <div className="login-container">
            <h2>Customer Login</h2>
            <form className="login-form">
                <label>Username/Email:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="button" onClick={handleLogin}>
                    Login
                </button>

                <button type="button" onClick={navigateToSignup}>
                    New Customer! Sign Up
                </button>
            </form>
        </div>
    );
};

export default Login;
