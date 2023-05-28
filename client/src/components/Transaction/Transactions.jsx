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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserTransactions();
    fetchBalance();
  }, []);

  // Fetch user transactions from the API
  const fetchUserTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/user-transaction`, {
        headers: {
          token: `${localStorage.getItem('accessToken')}`
        }
      });
      setTransactions(response.data.data[0].transactions);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fetch user balance from the API
  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/user-transaction`, {
        headers: {
          token: `${localStorage.getItem('accessToken')}`
        }
      });
      if (response.data.data.length === 0) {
        return;
      }
      setBalance(response.data.data[0].balance);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Handle deposit button click
  const handleDeposit = () => {
    setShowPopup(true);
    setInsufficientFunds(false);
    localStorage.setItem('type', 'deposit');
  };

  // Handle withdraw button click
  const handleWithdraw = () => {
    setShowPopup(true);
    setInsufficientFunds(false);
    localStorage.setItem('type', 'withdraw');
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupAmount(0);
  };

  // Handle input change in the popup amount field
  const handlePopupAmountChange = (e) => {
    setPopupAmount(parseFloat(e.target.value));
    setInsufficientFunds(false);
  };

  // Handle submitting the popup form
  const handlePopupSubmit = () => {
    const type = localStorage.getItem('type');
    if (type === 'deposit') {
      axios
        .patch(
          `${url}/api/transaction`,
          { amount: popupAmount, transactionType: 'credit' },
          {
            headers: {
              token: `${localStorage.getItem('accessToken')}`
            }
          }
        )
        .then(() => {
          fetchBalance();
          fetchUserTransactions();
        });
    } else {
      if (popupAmount > balance) {
        setInsufficientFunds(true);
        return;
      }
      axios
        .patch(
          `${url}/api/transaction`,
          { amount: popupAmount, transactionType: 'debit' },
          {
            headers: {
              token: `${localStorage.getItem('accessToken')}`
            }
          }
        )
        .then(() => {
          fetchBalance();
          fetchUserTransactions();
        });
    }
    handleClosePopup();
  };

  return (
    <div className="transactions-container">
      <h1>Transactions</h1>
      <p>Balance: {balance}</p>
      <button className="action-button" onClick={handleDeposit}>
        Deposit
      </button>
      <button className="action-button" onClick={handleWithdraw}>
        Withdraw
      </button>

      {loading ? (
        <p>Loading...</p> // Render a loading indicator while fetching data
      ) : (
        <>
          {showPopup && (
            <div className="popup">
              <div className="popup-inner">
                <button className="close-button" onClick={handleClosePopup}>
                  X
                </button>
                <p>Available balance: {balance}</p>
                <input type="number" value={popupAmount} onChange={handlePopupAmountChange} />
                {insufficientFunds && <p className="error-message">Insufficient Funds</p>}
                <button className="submit-button" onClick={handlePopupSubmit}>
                  Submit
                </button>
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
        </>
      )}
    </div>
  );
};

export default Transactions;
