const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findById(_id)
    res.status(200).send(task)
  } catch (e) {
    if (e.kind == 'ObjectId') {
      return res.status(404).send({
        error: `No task with the id: ${_id} found`,
      })
    }
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  const updates = Object.keys(req.body)
  const validUpdates = ['task', 'completed']
  const isValidUpdate = updates.every((update) => validUpdates.includes(update))

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Invalid updates!',
    })
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    })
    res.status(200).send(task)
  } catch (e) {
    if (e.kind == 'ObjectId') {
      return res.status(404).send({
        error: `No task with the id: ${_id} found`,
      })
    }
    res.status(500).send(e)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).send({
        error: `No task with id: ${req.params.id} found`,
      })
    }
    res.status(200).send(task)
  } catch (e) {
    if (e.kind == 'ObjectId') {
      return res.status(400).send({
        error: `No task with id: ${req.params.id} found`,
      })
    }

    res.status(500).send(e)
  }
})

module.exports = router
