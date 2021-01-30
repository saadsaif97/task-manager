const express = require('express')
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../config/dev.env'),
})
require('./db/mongoose')

// import router
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

// to parse the incoming json object in body of request
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
