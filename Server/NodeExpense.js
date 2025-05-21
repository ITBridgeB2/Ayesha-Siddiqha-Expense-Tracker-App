import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());
app.use(cors());

const db = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'expense_tracker',
};

// POST /expenses
app.post('/expenses', async (req, res) => {
  const { amount, category, date } = req.body;
  if (!amount || !category || !date) {
    return res.status(400).json({ error: 'Amount, category, and date are required' });
  }
  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)',
      [amount, category, date]
    );
    const [rows] = await connection.execute('SELECT * FROM expenses WHERE id = ?', [result.insertId]);
    await connection.end();
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /expenses
app.get('/expenses', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const [rows] = await connection.execute('SELECT * FROM expenses');
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /expenses/:id
app.get('/expenses/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const [rows] = await connection.execute('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
    await connection.end();
    if (rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});
app.get('/total', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const [rows] = await connection.execute('SELECT SUM(amount) AS total FROM expenses');
    await connection.end();
    res.json({ total: rows[0].total });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});
// app.get('/expenses/total', async (req, res) => {
//   try {
//     const connection = await mysql.createConnection(db);
//     const [rows] = await connection.execute('SELECT SUM(amount) AS total FROM expenses');
//     await connection.end();
//     if (rows[0].total === null) {
//       // If the total is null (meaning no expenses), set it to 0
//       res.json({ total: 0 });
//     } else {
//       res.json({ total: rows[0].total });
//     }
//   } catch (err) {
//     console.error("Error fetching total:", err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });





// PUT /expenses/:id
app.put('/expenses/:id', async (req, res) => {
  const { amount, category, date } = req.body;
  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute(
      'UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?',
      [amount, category, date, req.params.id]
    );
    if (result.affectedRows === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Expense not found' });
    }
    const [updated] = await connection.execute('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
    await connection.end();
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /expenses/:id
app.delete('/expenses/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(db);
    const [result] = await connection.execute('DELETE FROM expenses WHERE id = ?', [req.params.id]);
    await connection.end();
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3001, () => {
  console.log('Expense tracker server started on port 3001');
});



























































// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'expense_tracker'
// });
// module.exports = pool.promise();


// // server.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const db = require('./db');
// app.use(cors());
// app.use(express.json());

// // POST /expenses
// app.post('/expenses', async (req, res) => {
//   const { amount, category, date } = req.body;
//   if (!amount || !category || !date) {
//     return res.status(400).json({ error: 'Amount, category, and date are required' });
//   }
//   try {
//     const [result] = await db.execute(
//       'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)',
//       [amount, category, date]
//     );
//     const [rows] = await db.execute('SELECT * FROM expenses WHERE id = ?', [result.insertId]);
//     res.status(201).json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// // GET /expenses
// app.get('/expenses', async (req, res) => {
//   const [rows] = await db.execute('SELECT * FROM expenses');
//   res.json(rows);
// });

// // GET /expenses/:id
// app.get('/expenses/:id', async (req, res) => {
//   const [rows] = await db.execute('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
//   if (rows.length === 0) return res.status(404).json({ error: 'Expense not found' });
//   res.json(rows[0]);
// });

// // GET /expenses/total
// app.get('/expenses/total', async (req, res) => {
//   const [rows] = await db.execute('SELECT SUM(amount) AS total FROM expenses');
//   res.json({ total: rows[0].total });
// });

// // PUT /expenses/:id
// app.put('/expenses/:id', async (req, res) => {
//   const { amount, category, date } = req.body;
//   const [result] = await db.execute(
//     'UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?',
//     [amount, category, date, req.params.id]
//   );
//   if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
//   const [updated] = await db.execute('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
//   res.json(updated[0]);
// });

// // DELETE /expenses/:id
// app.delete('/expenses/:id', async (req, res) => {
//   const [result] = await db.execute('DELETE FROM expenses WHERE id = ?', [req.params.id]);
//   if (result.affectedRows === 0) return res.status(404).json({ error: 'Expense not found' });
//   res.status(204).send();
// });

// app.listen(3001, () => console.log('Server started on port 3001'));