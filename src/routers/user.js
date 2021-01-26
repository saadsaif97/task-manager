const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  const token = await user.generateAuthToken(req.body.email, req.body.password)
  try {
    await user.save()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password)
  const token = await user.generateAuthToken()

  try {
    res.status(200).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/users/me', auth, async (req, res) => {
  // we fetching profile in auth and not to pass the id for our profile
  res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const user = await User.findById(_id)
    res.status(200).send(user)
  } catch (e) {
    if (e.kind == 'ObjectId') {
      return res.status(404).send({
        error: `No user found with id: ${_id}`,
      })
    }

    res.status(500).send(e)
  }
})

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'email', 'password']
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Invalid updates!',
    })
  }

  try {
    const user = await User.findById(req.params.id)

    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()

    res.status(200).send(user)
  } catch (e) {
    if (e.kind == 'ObjectId') {
      return res.status(404).send({
        error: `No user with id: ${req.params.id} found`,
      })
    }

    res.status(500).send(e)
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send({
        error: `No user found with id: ${req.params.id}`,
      })
    }
    res.status(200).send(user)
  } catch (e) {
    if (e.kind == 'ObjectId') {
      return res.status(400).send({
        error: `No user with id: ${req.params.id} found`,
      })
    }

    res.status(500).send(e)
  }
})

module.exports = router
