import React from 'react';
import "./dashboard.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate=useNavigate();

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to the Banking Portal</h1>
      </div>
      <div className="button-group">
        <button onClick={()=>navigate("/banker-login")} className="login-button banker-login">Banker Login</button>
        <button onClick={()=>navigate("/cus-login")} className="login-button customer-login">Customer Login</button>
      </div>
    </div>
  );
};

export default Dashboard;
