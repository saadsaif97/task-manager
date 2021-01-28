const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// By default mongoose does not attach vituals
// Make userSchema attach virtuals whenever calling `JSON.stringify()`,
// including using `res.json()`
// userSchema.set('toJSON', { virtuals: true })

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'author',
})

userSchema.methods.toJSON = function () {
  user = this
  const userObject = user.toObject()

  delete userObject.tokens
  delete userObject.password

  return userObject
}

// you dont have to use arrow function while defining the instance and model methods TO ACCESS the user instance and class
// defining the instance method
userSchema.methods.generateAuthToken = async function () {
  const user = this

  const token = jwt.sign({ _id: user._id.toString() }, 'thisIsMyNewCourse')
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// defining the model method
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login')
  }
  const isMatched = await bcryptjs.compare(password, user.password)
  if (!isMatched) {
    throw new Error('Unable to login')
  }
  return user
}

// hashing the password before the user is saved
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8)
  }

  next()
})

// we could use it where the user was deleted but its good habit to use middleware for such things
userSchema.pre('remove', async function (next) {
  const user = this

  await Task.deleteMany({ author: user._id })

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
