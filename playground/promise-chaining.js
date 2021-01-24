require('../src/db/mongoose')
const Task = require('../src/models/task')

// const task = new Task({
//   task: 'Time zaya',
//   completed: true,
// })

// Task.find(
//   {
//     completed: true,
//   },
//   (err, result) => {
//     if (err) {
//       return console.log(err)
//     }

//     console.log(result)
//   }
// )

Task.findByIdAndDelete('600d3ce584846944bc107661', (err, result) => {
  if (err) {
    return console.log(err)
  }

  console.log(result)

  Task.find(
    {
      completed: false,
    },
    (err, result) => {
      if (err) {
        return console.log(err)
      }

      console.log(result.length)
    }
  )
})
