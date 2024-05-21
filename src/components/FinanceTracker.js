import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FinanceTracker.css';
export const FinanceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
    }
  };

  const handleAdd = async () => {
    const newTransaction = {
      title,
      amount:parseFloat(amount)
    };

    await addTransaction(newTransaction);
  };

  const addTransaction = async (newTransaction) => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', newTransaction);
      setTransactions([...transactions, response.data]);
      setTitle('');
      setAmount();
    } catch (error) {
      console.error('Error adding transaction:', error.message);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error.message);
    }
  };
const Transaction = ({ transaction }) => {
    const [editedTransaction, setEditedTransaction] = useState({ ...transaction });
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
      if (!isEditing) {
        setIsEditing(true);
      } else {
        handleUpdate();
        setIsEditing(false);
      }
    };

    const handleUpdate = async () => {
      try {

        const updatedTransaction = {
          title: editedTransaction.title,
          amount: parseFloat(editedTransaction.amount) 
        };
        await axios.put(`http://localhost:5000/api/transactions/${transaction.id}`, updatedTransaction);
        fetchTransactions();
        setTransactions(transactions.map(t => t.id === transaction.id ? updatedTransaction : t));
      } catch (error) {
        console.error('Error updating transaction:', error.message);
      }
    };
    

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedTransaction(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleDelete = () => {
      deleteTransaction(transaction.id);
    };

    return (
      <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        {isEditing ? (
          <>
            <input type="text" name="title" value={editedTransaction.title} onChange={handleChange} />
            <input type="number" name="amount" value={editedTransaction.amount} onChange={handleChange} />
            <button onClick={handleUpdate} className="update-btn">Update</button>
          </>
        ) : (
          <>
            <span>{transaction.title}</span>
            <span>{transaction.amount}</span>
            <button onClick={handleEdit} className="edit-btn">Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </>
        )}
      </li>
    );
  };
  const positiveAmounts = transactions.filter(transaction => transaction.amount > 0);
  const negativeAmounts = transactions.filter(transaction => transaction.amount < 0);
  
  // Calculate total income (positive transactions)
  const income = positiveAmounts.reduce((total, transaction) => total + transaction.amount, 0);
  
  // Calculate total expense (negative transactions)
  const expense = negativeAmounts.reduce((total, transaction) => total + transaction.amount, 0) * -1;
  
  // Calculate balance based on income and expense
  const balance = income - expense;
  

  return (
    <div className="finance-tracker">
      <h1>FINANCE TRACKER</h1>
    <div className="balance">
      <h3>Your Balance</h3>
      <p>{balance}</p>
    </div>
    <div className="income">
      <h3>Income</h3>
      <p>{income}</p>
    </div>
    <div className="expense">
      <h3>Expense</h3>
      <p>{expense}</p>
    </div>
      <h3>History</h3>
      <ul className="transaction-list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <h3>Add New Transaction</h3>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <label>Amount</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
      <button onClick={handleAdd}>Add Transaction</button>
    </div>
  );
};

export default FinanceTracker