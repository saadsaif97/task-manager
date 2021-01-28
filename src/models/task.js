const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
  task: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = Task
