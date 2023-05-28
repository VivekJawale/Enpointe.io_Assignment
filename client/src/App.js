import AllRoutes from './AllRoutes';
import './App.css';
import AllTransactions from './components/AllTransactions/AllTransactions';
import BankerLogin from './components/BankerLogin/BankerLogin';
import BankerSignUp from './components/BankerSignup/BankerSignup';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Transactions from './components/Transaction/Transactions';
import SignUp from './components/signup/SignUp';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
