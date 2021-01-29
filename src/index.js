const express = require('express')
// const multer = require('multer')
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

// // config the multer
// const upload = multer({
//   dest: 'uploads',
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       cb(new Error('Please upload the word document'))
//     }

//     cb(undefined, true)
//   },
// })
// const errorMiddleware = () => {
//   throw new Error('From the error middleware')
// }

// app.post(
//   '/upload',
//   errorMiddleware,
//   (req, res) => {
//     res.send()
//   },
//   (error, req, res, next) => {
//     res.status(400).send(error.message)
//   }
// )
