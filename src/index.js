const express = require('express')
require('./db/mongoose')

// import router
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// to parse the incoming json object in body of request
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

