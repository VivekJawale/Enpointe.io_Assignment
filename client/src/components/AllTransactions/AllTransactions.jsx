import React, { useEffect, useState } from 'react';
import './AllTransactions.css';
import axios from 'axios';

const url = 'https://blush-barracuda-shoe.cyclic.app';

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${url}/api/transaction`, {
        headers: {
          token: localStorage.getItem("accessToken")
        }
      });
      setTransactions(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching transactions:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="all-transactions">
      <h1>All Transactions</h1>
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="transaction-item">
              <p><strong>User ID:</strong> {transaction.user}</p>
              <p><strong>User's Account Number:</strong> {transaction.AccountNumber}</p>
              <p><strong>Account Type:</strong> {transaction.accountType}</p>
              {/* Add additional transaction details as needed */}
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
                  {transaction.transactions.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.transactionType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllTransactions;
