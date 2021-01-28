const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  try {
    // const task = new Task(req.body)
    const task = new Task({
      ...req.body,
      author: req.user._id,
    })
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks', auth, async (req, res) => {
  try {
    // both ways will work
    // const tasks = await Task.find({ author: req.user._id })
    await req.user.populate('tasks').execPopulate()
    res.status(200).send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const task = await Task.findOne({ _id, author: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

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

router.patch('/tasks/:id', auth, async (req, res) => {
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
    const task = await Task.findOne({ _id, author: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()

    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id,
    })

    if (!task) {
      return res.status(404).send({
        error: `No task with id: ${req.params.id} found`,
      })
    }

    await task.remove()
    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
