import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const url = 'https://blush-barracuda-shoe.cyclic.app';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${url}/api/signup`, {
                username,
                email,
                password,
            });

            console.log(response);

            const accessToken = response.data.token;

            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("cusId", response.data.data._id)

            navigate("/user-transaction")

        } catch (error) {
            console.error("Signup failed", error);
            alert(error.response.data.message)
        }
    };

    return (
        <div className="signup-container">
            <h2>Customer Sign Up</h2>
            <form className="signup-form">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={handleSignup}>
                    Sign Up
                </button>
                <button type="button" onClick={() => navigate("/cus-login")}>
                    Exiting Customer! Login
                </button>
            </form>
        </div>
    );
};

export default SignUp;
