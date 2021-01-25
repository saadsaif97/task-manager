const bcryptjs = require('bcryptjs')

const myFunction = async (input) => {
  const myPass = 'pass'
  const hashedPass = await bcryptjs.hash(myPass, 8)
  console.log(myPass)
  console.log(hashedPass)
  const isMatch = await bcryptjs.compare(input, hashedPass)
  console.log(isMatch)
}

myFunction('pass')
