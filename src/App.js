import { useState,useEffect } from 'react';
import './App.css';
import ExpenseList from './component/ExpenseList';
import Alert from './component/Alert';
import ExpenseForm from './component/ExpenseForm';
import { v4 as uuidv4 } from 'uuid';
// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "car paymnet", amount: 4600 },
//   { id: uuidv4(), charge: "credit card bill", amount: 1600 }
// ];
const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem("expenses")):[];

function App() {
  const [expenses, setexpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({show:false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

useEffect(()=>{
  localStorage.setItem('expenses',JSON.stringify(expenses));
},[expenses]);

  const handleCharge = e =>{
    setCharge(e.target.value);
  }
  const handleAmount = e =>{
    setAmount(e.target.value);
  }

  const handleAlert=({type, text})=>{
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }
  const onHandleSubmit = e =>{
    e.preventDefault();
    if(charge !==""&& amount>0){
      if(edit){
          let tempExpenses = expenses.map(item =>{
            return item.id === id ? {...item,charge,amount} :item
          });
          setexpenses(tempExpenses);
          setEdit(false);
          handleAlert({type:"success",text:"item edited"})
    
      }
      else{
        const singleExpenses = {id:uuidv4(), charge, amount};
        setexpenses([...expenses, singleExpenses]);
        handleAlert({type:'success', text:"item added"})
      }
      setCharge('');
      setAmount('');

    }
    else{
      handleAlert({type: "danger", text: "charge is empty or amount is less or equal to zero"})
    }
  }

  const clearItems = ()=>{
    setexpenses([]);
  }
  const handleDelete =(id)=>{
  let tempExpenses = expenses.filter(item => item.id !== id);
  setexpenses(tempExpenses);
  handleAlert({type: "danger", text:" deleted"})

  }
  const handleEdit =(id)=>{
    console.log("clicked");
    let expense = expenses.find(item=>item.id === id);
    let {charge,amount} = expense
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <Alert/>
      
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm charge={charge} amount={amount} 
        handleAmount={handleAmount}
        handleCharge={handleCharge}
        handleSubmit={onHandleSubmit} />
        <ExpenseList expenses={expenses}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}
        edit={edit}
        />
      </main>
      <h1>
        total spending: <span className="total">
          ${expenses.reduce((arr,crr)=>{
            return (arr += parseInt(crr.amount));
          },0)}
        </span>
      </h1>
    </div>
  )
    ;
}

export default App;
