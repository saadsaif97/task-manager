require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('6008664e80cbfd45c0a3f965', { age: 20 })
//   .then((result) => {
//     console.log(result)
//     return User.find({ age: 23 })
//   })
//   .then((users) => {
//     console.log(users)
//   })
//   .catch((err) => console.log(err))

const updateAgeandCont = async (id, age) => {
  await User.findByIdAndUpdate(id, { age: 21 })
  const count = User.countDocuments({ age })
  return count
}

updateAgeandCont('6008664e80cbfd45c0a3f965', 23)
  .then((count) => console.log(count))
  .catch((err) => console.log(err))
