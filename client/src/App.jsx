import React, { useState } from 'react'
import TaskCard from './components/TaskCard'

const App = () => {
  const [task, setTask] = useState('')
  const [taskArray, setTaskArray] = useState([])

  const handleTaskChange = (taskValue) => {
    setTask(taskValue)
  }

  const addTask = () => {
    setTaskArray([
      ...taskArray,
      {
        id: Date.now(),
        title: task,
        completed: false,
      },
    ])
    console.log(taskArray)
  }

  const deleteTask = (taskId) => {
    const updatedArray = taskArray.filter((prev) => prev.id !== taskId)
    setTaskArray(updatedArray)
  }

  const onToggle = (taskId) => {
    const updatedArray = taskArray.map((task)=>task.id ===taskId ? {...task,completed:!task.completed}:task)
    setTaskArray(updatedArray)
  }

  return (
    <div className="  flex flex-col  gap-4 items-center bg-gray-100  border">
      <h1>To Do List</h1>
      <div className="">
        <input
          className="border "
          onChange={(e) => handleTaskChange(e.target.value)}
          type="text"
          value={task}
          placeholder="Enter Your Task"
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-md cursor-pointer"
          onClick={() => addTask()}
        >
          Add
        </button>
      </div>
      <div className="">
        {taskArray.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={deleteTask} onToggle={onToggle} />
        ))}
      </div>
    </div>
  )
}

export default App
