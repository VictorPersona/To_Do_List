import React from 'react'

const TaskCard = ({ task, onDelete,onToggle }) => {
  return (
    <div className="flex gap-3 items-center">
      <div onClick={()=>onToggle(task._id)} className={`cursor-pointer  w-full ${task.completed ? 'line-through text-gray-400':""}`  }>{task.title}</div>
      
      <button
        onClick={() => onDelete(task._id)}
        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer"
      >
       
        Delete
      </button>
    </div>
  )
}

export default TaskCard
