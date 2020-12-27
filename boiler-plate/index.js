const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
dotenv.config()

const password = process.env.DB_PASSWORD

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://david-kim:${password}@boilerplate.p2j4o.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})