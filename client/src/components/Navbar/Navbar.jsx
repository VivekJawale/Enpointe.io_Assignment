import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {



    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Banking App</Link>
            </div>
            <ul className="navbar-links">

                <li>
                    <span className="username">Welcome, User </span>
                </li>

                <li>
                    <Link to="/cus-login">customer Login</Link>
                </li>


            </ul>
        </nav>
    );
};

export default Navbar;
