require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findById('600d42cd19a4e0572cbc674e')
//   .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//   })
//   .then((inCompleteTasks) => console.log(inCompleteTasks))
//   .catch((err) => console.log(err))

const deleteAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = Task.countDocuments({ completed: false })
  return count
}

deleteAndCount('600d42cd19a4e0572cbc674e')
  .then((count) => console.log(count))
  .catch((err) => console.log(err))
