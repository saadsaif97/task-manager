const mongoose = require('mongoose')

const dbURL = process.env.MONGODB_URL

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
