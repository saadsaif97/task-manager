const mongoose = require('mongoose')

const taskScema = new mongoose.Schema(
  {
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
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', taskScema)

module.exports = Task
