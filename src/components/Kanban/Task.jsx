import React, { useState } from 'react'

const Task = ({name,increment,decrement,deleteTask}) => {
  return (
        <div className='flex flex-row justify-between items-center w-full border p-3'>
            <p className='text-black'>{name}</p>
            <div className='flex flex-row justify-center items-center gap-3'>
                <button className='rotate-180' onClick={decrement}>
                    <img src={'assets/arrow.svg'} height={20} width={20} alt='backward'/>
                </button>
                <button className='' onClick={increment}>
                    <img src={'assets/arrow.svg'} height={20} width={20} alt='forward'/>
                </button>
                <button className='' onClick={deleteTask}>
                    <img src={'assets/bin.svg'} height={20} width={20} alt='delete'/>
                </button>
            </div>
        </div>
  )
}

export default Task