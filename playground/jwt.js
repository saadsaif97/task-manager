const jwt = require('jsonwebtoken')

const myAuth = async () => {
  const token = jwt.sign({ _id: '12345' }, 'dingdong', {
    expiresIn: '2 days',
  })
  console.log(token)
  const data = jwt.verify(token, 'dingdong')
  console.log(data)
}

myAuth()
