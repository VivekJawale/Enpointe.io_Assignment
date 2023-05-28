import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './transactions.css';



const url = 'https://blush-barracuda-shoe.cyclic.app';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupAmount, setPopupAmount] = useState(0);
  const [insufficientFunds, setInsufficientFunds] = useState(false);

  useEffect(() => {
    fetchUserTransactions();
    fetchBalance();
  }, []);


  const fetchUserTransactions = async () => {
    try {
      const response = await axios.get(`${url}/api/user-transaction`, {
        headers: {
          token: `${localStorage.getItem("accessToken")}`
        }
      });
      console.log(response);
      setTransactions(response.data.data[0].transactions);
      // setBalance(response.data.data.balance)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${url}/api/user-transaction`, {
        headers: {
          token: `${localStorage.getItem("accessToken")}`
        }
      });
      if (response.data.data.length === 0) {
        return
      }
      setBalance(response.data.data[0].balance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeposit = () => {
    setShowPopup(true);
    setInsufficientFunds(false);
    localStorage.setItem("type", "deposit")
  };

  const handleWithdraw = () => {
    setShowPopup(true);
    setInsufficientFunds(false);
    localStorage.setItem("type", "withdraw")
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupAmount(0);
  };

  const handlePopupAmountChange = (e) => {
    setPopupAmount(parseFloat(e.target.value));
    setInsufficientFunds(false);
  };

  const handlePopupSubmit = () => {
    const type = localStorage.getItem("type");
    if (type === "deposit") {
      axios.patch(`${url}/api/transaction`, { amount: popupAmount, transactionType: "credit" }, {
        headers: {
          token: `${localStorage.getItem("accessToken")}`
        },
      }).then(() => {
        fetchBalance()
        fetchUserTransactions()
      })
    } else {
      if (popupAmount > balance) {
        setInsufficientFunds(true);
        return;
      }
      axios.patch(`${url}/api/transaction1`, { amount: popupAmount, transactionType: "debit" }, {
        headers: {
          token: `${localStorage.getItem("accessToken")}`
        },
      }).then(() => {
        fetchBalance()
        fetchUserTransactions()
      })
    }
    handleClosePopup();
  };

  return (
    <div className="transactions-container">
      <h1>Transactions</h1>
      <p>Balance: {balance}</p>
      <button className="action-button" onClick={handleDeposit}>Deposit</button>
      <button className="action-button" onClick={handleWithdraw}>Withdraw</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-button" onClick={handleClosePopup}>
              X
            </button>
            <p>Available balance: {balance}</p>
            <input type="number" value={popupAmount} onChange={handlePopupAmountChange} />
            {insufficientFunds && <p className="error-message">Insufficient Funds</p>}
            <button className="submit-button" onClick={handlePopupSubmit}>Submit</button>
          </div>
        </div>
      )}

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.transactionType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
