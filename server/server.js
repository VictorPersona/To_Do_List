const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const taskRoutes = require('./router/TaskRoute.js')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
const uri = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

mongoose
  .connect(uri)
  .then(() => console.log('Mongoose Connected'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.json('Server is working')
})

app.use('/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log('Server is listening on port : ', PORT)
})
