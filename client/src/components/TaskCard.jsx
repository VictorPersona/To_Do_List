import React from 'react'

const TaskCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center bg-gray-50 p-3 rounded-md shadow-md">
      <div
        onClick={() => onToggle(task._id)}
        className={`cursor-pointer  w-full break-words ${
          task.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {task.title}
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl w-fit cursor-pointer"
      >
        Delete
      </button>
    </div>
  )
}

export default TaskCard
