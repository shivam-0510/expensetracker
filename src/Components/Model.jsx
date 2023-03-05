import React,{useState} from 'react'
import '../App.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const Model = ({setIsModelOpen,modelRequestType,onAddExpenseHandler,onAddIncomeHandler}) => {
  const [description,setDescription]=useState("");
  const [amount,setAmount]=useState("");
  const onButtonClick=()=>{
    if(!description || !amount){
        return;
    }
    if(modelRequestType==='expense'){
        onAddExpenseHandler(description,amount);
    }
    if(modelRequestType==='income'){
        onAddIncomeHandler(description,amount);
    }
    setIsModelOpen(false);
  }
  return (
    <>  
        <div className='model-overlay'>
            <div className='model'>
                <HighlightOffIcon className='model-close-icon'
                onClick={()=>{setIsModelOpen(false)}}/>
                <h2>{modelRequestType==='expense'?'Add Expense':'Add Income'}</h2>
                <input type='text' placeholder='Enter Description' value={description} onChange={(event)=>{setDescription(event.target.value)}}/>
                <input type='text' placeholder='Enter Amount' value={amount} onChange={(event)=>{setAmount(event.target.value)}}/>
                <button onClick={onButtonClick}>{modelRequestType==='expense'?'Add Expense':'Add Income'}</button>
            </div>
        </div>
    </>
  )
}

export default Model