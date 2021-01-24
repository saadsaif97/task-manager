const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Please input the valid email')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not include "password"')
      } else if (value.length <= 6) {
        throw new Error('Password must be greater than 6 digits long')
      }
    },
  },
  age: {
    type: Number,
    default: 0,
  },
})

module.exports = User
