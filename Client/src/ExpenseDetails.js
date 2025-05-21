import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpenseDetails = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/expenses/${id}`)
      .then(res => setExpense(res.data))
      .catch(() => navigate('/notfound'));
  }, [id, navigate]);

  const deleteExpense = async () => {
    await axios.delete(`http://localhost:3001/expenses/${id}`);
    navigate('/');
  };

  if (!expense) return <p style={styles.loading}>Loading expense details...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👁️ Expense Details</h2>
      <div style={styles.card}>
        <p><span style={styles.label}>Amount:</span> ${expense.amount}</p>
        <p><span style={styles.label}>Category:</span> {expense.category}</p>
        <p><span style={styles.label}>Date:</span> {new Date(expense.date).toLocaleDateString()}</p>
      </div>
      <div style={styles.actions}>
        <Link to={`/expenses/${id}/edit`} style={styles.editButton}>✏️ </Link>
        <button onClick={deleteExpense} style={styles.deleteButton}>❌ </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.6rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
    fontWeight: '600',
  },
  card: {
    fontSize: '1.05rem',
    color: '#444',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '8px',
    lineHeight: '1.7',
    marginBottom: '1.8rem',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  editButton: {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '6px',
    fontWeight: '500',
    transition: '0.3s',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: '0.3s',
  },
  loading: {
    textAlign: 'center',
    marginTop: '4rem',
    fontSize: '1.2rem',
    color: '#888'
  }
};

export default ExpenseDetails;




















































// import { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ExpenseDetails = () => {
//   const { id } = useParams();
//   const [expense, setExpense] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:3001/expenses/${id}`).then(res => setExpense(res.data));
//   }, [id]);

//   const deleteExpense = async () => {
//     await axios.delete(`http://localhost:3001/expenses/${id}`);
//     navigate('/');
//   };

//   if (!expense) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;

//   return (
//     <div style={styles.container}>
//       <h3 style={styles.heading}>Expense Details</h3>
//       <div style={styles.detailBox}>
//         <p><strong>Amount:</strong> ${expense.amount}</p>
//         <p><strong>Category:</strong> {expense.category}</p>
//         <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
//       </div>
//       <div style={styles.actions}>
//         <Link to={`/expenses/${id}/edit`} style={styles.editButton}>Edit</Link>
//         <button onClick={deleteExpense} style={styles.deleteButton}>Delete</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '500px',
//     margin: '3rem auto',
//     padding: '2rem',
//     border: '1px solid #ccc',
//     borderRadius: '10px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#fafafa'
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '1.5rem',
//     color: '#333'
//   },
//   detailBox: {
//     lineHeight: '1.8',
//     fontSize: '1rem',
//     color: '#444'
//   },
//   actions: {
//     marginTop: '2rem',
//     display: 'flex',
//     justifyContent: 'space-between'
//   },
//   editButton: {
//     textDecoration: 'none',
//     backgroundColor: '#007bff',
//     color: 'white',
//     padding: '0.5rem 1rem',
//     borderRadius: '5px'
//   },
//   deleteButton: {
//     backgroundColor: '#dc3545',
//     color: 'white',
//     padding: '0.5rem 1rem',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer'
//   }
// };

// export default ExpenseDetails;





































