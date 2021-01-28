const Task = require('../src/models/task')
const User = require('../src/models/user')
require('../src/db/mongoose')

const fun = async () => {
  // find task and populate its author
  //   const task = await Task.findById('60124bf2d1c8a85cbc5654dc')
  //   await task.populate('author').execPopulate()
  //   console.log(task)

  //   find the user and populate its tasks (virtual property)
  const user = await User.findById('60121e647a2b4a5464d34d8b')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

fun()
