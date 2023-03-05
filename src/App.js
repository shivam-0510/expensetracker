import React from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Model from './Components/Model'
import uniqid from 'uniqid'
import { useState } from 'react'
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const App = () => {
  const [isModelOpen,setIsModelOpen]=useState(false);
  const [modelRequestType,setModelRequestType]=useState("");
  const [expenses,setExpenses]=useState([]);
  const [incomes,setIncomes]=useState([]);
  const onExpenseBoxClick=()=>{
    setIsModelOpen(true);
    setModelRequestType("expense")
  }
  const onIncomeBoxClick=()=>{
    setIsModelOpen(true)
    setModelRequestType("income")
  }
  const onAddExpenseHandler=(description,amount)=>{
    const oldExpenses=[...expenses];
    const newExpense={
      id:uniqid(),
      type:"expense",
      amount:amount,
      description:description
    };
    const newExpenses=oldExpenses.concat(newExpense);
    setExpenses(newExpenses);
  }
  const onAddIncomeHandler=(description,amount)=>{
    const oldIncomes=[...incomes];
    const newIncome={
      id:uniqid(),
      type:"income",
      amount:amount,
      description:description
    };
    const newIncomes=oldIncomes.concat(newIncome);
    setIncomes(newIncomes);
  }
  const onRemoveTransactionsHandler=(type,id)=>{
    if(type==='expense'){
      const oldExpenses=[...expenses];
      const newExpenses=oldExpenses.filter((expense)=>expense.id!==id)
      setExpenses(newExpenses);
    }
    if(type==='income'){
      const oldIncomes=[...incomes];
      const newIncomes=oldIncomes.filter((income)=>income.id!==id)
      setIncomes(newIncomes);
    }
  }

  const transactions=[...expenses,...incomes];
  /* console.log(transactions); */
  
  return (
    <>
      <div className='App'>
        <Header/>
        {isModelOpen && <Model 
        setIsModelOpen={setIsModelOpen} 
        modelRequestType={modelRequestType}
        onAddExpenseHandler={onAddExpenseHandler}
        onAddIncomeHandler={onAddIncomeHandler}/>}
        <div className='content'>
          <div className='boxes-wrapper'>
            <div className='box-expense' onClick={onExpenseBoxClick}><AddShoppingCartSharpIcon fontSize='large' htmlColor='red'/>Add Expense</div>
            <div className='box-income' onClick={onIncomeBoxClick}><AttachMoneySharpIcon fontSize='large' htmlColor='green'/>Add Income</div>
          </div>
          <div className="transactions-wrapper">
              {transactions.length>0 ?
                <h1>All Transactions</h1>:
                <h1>No Transactions</h1>
              }
              {transactions.map(transaction => {
                return (
                  <div key={transaction.id}
                  style={{
                    width:"50%",
                    height:'30px',
                    padding:"20px",
                    background:transaction.type==='income'?"#b5e48c":"#db3a34",
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between',
                    borderRadius:"10px",
                    marginTop:"20px",
                    boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"
                  }}>
                    <div>{transaction.description}</div>
                    <div>{transaction.amount}</div>
                    <div className='delete-button'><HighlightOffIcon fontWeight='bold' onClick={()=>onRemoveTransactionsHandler(transaction.type,transaction.id)}/></div>
                  </div>
                )
              })}
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}
export default App