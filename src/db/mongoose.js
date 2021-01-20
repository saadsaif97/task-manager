// data validation and sanitization
// we can enforce that the data conforms to some rules

const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// user model
// here we are setting up the fields for the user document
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

// const me = new User({
//   name: '     MUAZ          ',
//   email: 'HAMMAD@gmail.COM',
//   password: 'password sda',
//   age: 19,
// })

// me.save()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))

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
})

const task = new Task({
  task: "Complete MERN and then Sir Zia's course",
})

task
  .save()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
