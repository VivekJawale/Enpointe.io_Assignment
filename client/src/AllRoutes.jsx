import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AllTransactions from './components/AllTransactions/AllTransactions';
import BankerLogin from './components/BankerLogin/BankerLogin';
import BankerSignUp from './components/BankerSignup/BankerSignup';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Transactions from './components/Transaction/Transactions';
import SignUp from './components/signup/SignUp';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cus-login" element={<Login />} />
            <Route path="/cus-signup" element={<SignUp />} />
            <Route path="/banker-login" element={<BankerLogin />} />
            <Route path="/banker-signup" element={<BankerSignUp />} />
            <Route path="/user-transaction" element={<PrivateRoute><Transactions /></PrivateRoute>} />
            <Route path="/all-transactions" element={<PrivateRoute><AllTransactions /></PrivateRoute>} />
        </Routes>
    );
};

export default AllRoutes;
