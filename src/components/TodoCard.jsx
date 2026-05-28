import axios from 'axios';
import React, { useState } from 'react'
import { CiTrash } from "react-icons/ci";
import Loader from './Loader';

function TodoCard({title, handleDelete, id}) {
    let [deleteStatus, setDeleteStatus] = useState(false);

    function handleDeleteClick(){
        setDeleteStatus(true);
        handleDelete(id);
    }

  return (
    <div className='border border-neutral-400 shadow-md rounded-xl box-border p-4 flex justify-between mb-1'>
      <h2 className='text-neutral-600'>{title}</h2>
      <button onClick={handleDeleteClick} className='text-neutral-600 text-xl hover:text-red-700'>{deleteStatus ? <Loader /> : <CiTrash />}</button>
    </div>
  )
}

export default TodoCard
