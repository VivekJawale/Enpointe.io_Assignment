import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        if (accessToken == null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }

    }, [accessToken])
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
 < Navigate to "/"/>
        alert('logged out');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Banking App</Link>
            </div>
            <ul className="navbar-links">
                {isLoggedIn ? (
                    <li>
                        <button type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to="/banker-login">Banker Login</Link>
                    </li>
                )}
                {isLoggedIn ? (
                    <li>
                        <span className="username">Welcome, User </span>
                    </li>
                ) : (
                    <li>
                        <Link to="/banker-signup">Banker Signup</Link>
                    </li>
                )}
                <li>
                    <Link to="/cus-login">customer Login</Link>
                </li>
                <li>
                    <Link to="/all-transactions">All Transactions</Link>
                </li>
                {/* Add more navbar links as needed */}
            </ul>
        </nav>
    );
};

export default Navbar;
