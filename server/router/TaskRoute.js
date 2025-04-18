const express = require('express')
const Task = require('../models/Task')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json({ message: 'Tasks Retrieved Successfully', tasks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newTaskTitle = req.body.title
    const newTask = new Task({
      title: newTaskTitle,
    })
    await newTask.save()
    res.status(201).json({ message: 'Task Created Successfully', newTask })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
    return  res.status(404).json({ message: 'Task Not Found' })
    }
    task.completed = !task.completed
    await task.save()
    res.status(200).json({ message: 'Task Updated Successfully', task })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).json({message:"Task does not exist"})
        }
        res.json({message:"Task Deleted Successfulyy"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
module.exports = router