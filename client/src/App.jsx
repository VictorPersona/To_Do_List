import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskCard from './components/TaskCard'

const App = () => {
  const [task, setTask] = useState('')
  const [taskArray, setTaskArray] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleTaskChange = (taskValue) => {
    setTask(taskValue)
  }

  const addTask = async () => {
    const newTaskTitle = task
    const response = await axios.post(backendUrl, { title: newTaskTitle })
    console.log(response.data.message)
    setTask('')
    fetchAllTasks()
  }

  const fetchAllTasks = async () => {
    const response = await axios.get(backendUrl)

    if (response) {
      setTaskArray(response.data.tasks)
    } else {
      console.log(response.message)
    }
  }

  const deleteTask = async (taskId) => {
    const response = await axios.delete(`${backendUrl}/${taskId}`)
    fetchAllTasks()
  }

  const onToggle = async (taskId) => {
    const response = await axios.put(`${backendUrl}/${taskId}`)
    fetchAllTasks()
  }

  useEffect(() => {
    fetchAllTasks()
  }, [])

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
        {taskArray && taskArray.length > 0 ? (
          taskArray.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onToggle={onToggle}
            />
          ))
        ) : (
          <p>No tasks Available</p>
        )}
        {}
      </div>
    </div>
  )
}

export default App
