import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskCard from './components/TaskCard'

const App = () => {
  const [task, setTask] = useState('')
  const [taskArray, setTaskArray] = useState([])
  const [isAdding,setIsAdding] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  if(!backendUrl){
    console.error("Backend URL not found in .env")
    return
  }

  const handleTaskChange = (taskValue) => {
    setTask(taskValue)
  }

  const addTask = async () => {
    if(!task.trim()||isAdding)return
   
    const tempTask = { title: task, completed: false, _id: Date.now() }
    setTaskArray([...taskArray, tempTask])
    setTask('')

    try {
      setIsAdding(true)
      const response = await axios.post(backendUrl, { title: tempTask.title })
      const createdTask = response.data.newTask

      setTaskArray((prev) =>
        prev.map((t) => (t._id === tempTask._id ? createdTask : t))
      )
     
    } catch (error) {
      console.log('Error in adding Task : ', error.message)
      setTaskArray((prev) => prev.filter((t) => t._id !== tempTask._id))
    }finally{
       setIsAdding(false)
    }

    // fetchAllTasks()
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
    const taskToDelete = taskArray.find((t) => t._id === taskId)

    setTaskArray((prev) => prev.filter((t) => t._id !== taskId))

    try {
      const response = await axios.delete(`${backendUrl}/${taskId}`)
    } catch (error) {
      console.log('Error while deleting task :', error)
      setTaskArray([...taskArray, taskToDelete])
    }

    // fetchAllTasks()
  }

  const onToggle = async (taskId) => {
    setTaskArray((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, completed: !t.completed } : t
      )
    )
    try {
      const response = await axios.put(`${backendUrl}/${taskId}`)
    } catch (error) {
      console.log('Error in updating task :', error)
      setTaskArray((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, completed: !t.completed } : t
        )
      )
    }

    // fetchAllTasks()
  }

  useEffect(() => {

    const loadTasks = async()=>{
      try {
        await fetchAllTasks()
      } catch (error) {
          const cached = localStorage.getItem('tasks')
          if(cached){
            setTaskArray(JSON.parse(cached))
          }
      }
    }

   loadTasks()
    
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskArray))
  }, [taskArray])

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
