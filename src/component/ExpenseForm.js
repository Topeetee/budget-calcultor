import React from 'react'
import { MdSend } from 'react-icons/md';

const ExpenseForm = () => {
  return (
    <form className='form-center'>
        <div className='form-group'>
            <label htmlFor="charge">charge</label>
            <input type="text" className='form-control' id="charge " name="charge" placeholder='e.g rent' />
        </div>
    </form>
  )
}

export default ExpenseForm