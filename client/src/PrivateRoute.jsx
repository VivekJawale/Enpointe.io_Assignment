import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    if (localStorage.getItem('accessToken') !== null) {
        return children;
    }
    alert("Not authenticated")
    return <Navigate to="/" />

};

export default PrivateRoute;