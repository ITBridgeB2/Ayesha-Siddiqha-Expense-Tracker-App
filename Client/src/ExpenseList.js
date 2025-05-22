import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:3001/expenses');
    const totalRes = await axios.get('http://localhost:3001/total');
    setExpenses(res.data);
    setTotal(totalRes.data.total);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:3001/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.total}>Total Spent: ${total}</h2>
      <Link to="/add" style={styles.addButton}>Add Expense</Link>
      <ul style={styles.list}>
        {expenses.map(exp => (
          <li key={exp.id} style={styles.listItem}>
            <span style={styles.amount}>${exp.amount}</span> - {exp.category} ({exp.date})
            <div style={styles.actions}>
              <Link to={`/expenses/${exp.id}`} style={styles.viewButton}>👁️</Link>
              <button onClick={() => deleteExpense(exp.id)} style={styles.deleteButton}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  total: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  addButton: {
    display: 'block',
    textAlign: 'center',
    padding: '0.8rem 1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#28a745',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  viewButton: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ExpenseList;






































