import { useState } from 'react';
import './App.css';
import ExpenseList from './component/ExpenseList';
import Alert from './component/Alert';
import ExpenseForm from './component/ExpenseForm';
import { v4 as uuidv4 } from 'uuid';
const initialExpenses = [
  { id: uuidv4(), charge: "rent", amount: 1600 },
  { id: uuidv4(), charge: "car paymnet", amount: 4600 },
  { id: uuidv4(), charge: "credit card bill", amount: 1600 }
];

function App() {
  const [expenses, setexpenses] = useState(initialExpenses);
  return (
    <div>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm />
        <ExpenseList expenses={expenses}/>
      </main>
      <h1>
        total spending: <span className="total">
          ${expenses.reduce((arr,crr)=>{
            return (arr += crr.amount);
          },0)}
        </span>
      </h1>
    </div>
  )
    ;
}

export default App;
