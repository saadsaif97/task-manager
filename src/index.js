const express = require('express')
require('./db/mongoose')

// import models
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// create user API
app.post('/users', (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err))
})

// create task API
app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err))
})

app.listen(port, () => {
  console.log(`Listening to the port ${port}`)
})
