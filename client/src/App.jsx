import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import TaskCard from './components/TaskCard'
import { Analytics } from '@vercel/analytics/react'

const App = () => {
  const [task, setTask] = useState('')
  const [taskArray, setTaskArray] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTaskTitle, setEditingTaskTitle] = useState('')
  const [editingTaskCompleted, setEditingTaskCompleted] = useState(false)
  const inputRef = useRef(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  if (!backendUrl) {
    console.error('Backend URL not found in .env')
    return
  }

  const handleTaskChange = (taskValue) => {
    setTask(taskValue)
  }

  const addTask = async () => {
    if (!task.trim() || isAdding) return

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
    } finally {
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

  const onEdit = (task) => {
    setEditingTaskTitle(task.title)
    setEditingTaskCompleted(task.completed)
    setTask(task.title)
    setEditingTaskId(task._id)
  }

  const updateTitle = async (taskId) => {
    if (task === editingTaskTitle) {
      console.log('Both are same')
      setTask('')
      setEditingTaskId(null)
      setEditingTaskTitle('')
      return
    }

    const updatedArray = taskArray.map((t) =>
      t._id === taskId ? { ...t, title: task } : t
    )

    setTaskArray(updatedArray)
    setTask('')
    try {
      const response = await axios.put(`${backendUrl}/${taskId}`, {
        updatedTaskTitle: task,
        isUpdatedTaskComplete: editingTaskCompleted,
      })
    } catch (error) {
      console.log('Error in updating task :', error)
      setTaskArray(
        taskArray.map((t) =>
          t._id === taskId ? { ...t, title: editingTaskTitle } : t
        )
      )
    } finally {
      setEditingTaskId(null)
      setEditingTaskTitle('')
    }
  }

  const onToggle = async (task) => {
    setTaskArray((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    )
    try {
      const response = await axios.put(`${backendUrl}/${task._id}`, {
        updatedTaskTitle: task.title,
        isUpdatedTaskComplete: !task.completed,
      })
    } catch (error) {
      console.log('Error in updating task :', error)
      setTaskArray((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, completed: t.completed } : t
        )
      )
    }

    // fetchAllTasks()
  }

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchAllTasks()
      } catch (error) {
        const cached = localStorage.getItem('tasks')
        if (cached) {
          setTaskArray(JSON.parse(cached))
        }
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    if (editingTaskId) {
      inputRef.current?.focus()
    }
  }, [editingTaskId])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskArray))
  }, [taskArray])

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-4">
      <div className=" w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">To Do List</h1>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md "
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && editingTaskId) {
                updateTitle(editingTaskId)
              }
            }}
            onChange={(e) => handleTaskChange(e.target.value)}
            type="text"
            value={task}
            placeholder="Enter Your Task"
          />

          {editingTaskId ? (
            <button
              className="bg-yellow-600 text-white font-semibold p-2 px-4 rounded-lg shadow-md cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
              disabled={!task.trim()}
              onClick={() => updateTitle(editingTaskId)}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md disabled:bg-gray-400 cursor-pointer"
              onClick={() => addTask()}
              disabled={isAdding || !task.trim()}
            >
              Add
            </button>
          )}
        </div>
        <div className="space-y-4">
          {taskArray && taskArray.length > 0 ? (
            taskArray.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={deleteTask}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks Available</p>
          )}
          {}
        </div>
        <Analytics />
      </div>
    </div>
  )
}

export default App
