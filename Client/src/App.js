import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ExpenseList />} />
        <Route path='/add' element={<ExpenseForm />} />
        <Route path='/expenses/:id' element={<ExpenseDetails />} />
        <Route path='/expenses/:id/edit' element={<ExpenseForm />} />
      </Routes>
    </Router>
  );
}
export default App;
