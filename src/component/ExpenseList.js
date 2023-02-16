import React from 'react'
import Item from './ExpenseItem'
import {MdDelete} from 'react-icons/md'
import { clear } from '@testing-library/user-event/dist/clear'
const ExpenseList = ({expenses, handleEdit, handleDelete, clearItems}) => {
  return (
    
    <div >
        <ul className='list'>
    {expenses.map((expense)=>{
        return <Item key={expense.id} expense={expense} 
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />;
    })}
        </ul>
        {expenses.length > 0 && <button onClick={clearItems} className='btn'>Clear expenses <MdDelete className='btn-icon'/></button>}
    </div>
  )
}

export default ExpenseList