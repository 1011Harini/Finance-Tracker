const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let transactions = [];

app.get('/api/transactions', (req, res) => {
  res.status(200).json(transactions);
});
// Add a new transaction
app.post('/api/transactions', (req, res) => {
  const { title, amount } = req.body;
  const newTransaction = {
    id: Math.floor(Math.random() * 100000000),
    title,
    amount
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});
// Delete a transaction by ID
app.delete('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = transactions.length;
  transactions = transactions.filter(transaction => transaction.id !== id);
  if (transactions.length === initialLength) {
    return res.status(404).json({ message: 'Transaction not found.' });
  }
  res.status(200).json({ id: id });
});

// Update a transaction by ID
app.put('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, amount } = req.body;

  let updatedTransaction = null;
  transactions = transactions.map(transaction => {
    if (transaction.id === id) {
      updatedTransaction = {
        id: transaction.id,
        title: title || transaction.title,
        amount: amount || transaction.amount
      };
      return updatedTransaction;
    }
    return transaction;
  });

  if (!updatedTransaction) {
    return res.status(404).json({ message: 'Transaction not found.' });
  }

  res.status(200).json(updatedTransaction);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));