const express = require('express')
const app = express()
const port = 3000
const { User } = require('./models/user')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

dotenv.config()
const password = process.env.DB_PASSWORD

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://david-kim:${password}@boilerplate.p2j4o.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err))

app.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({
      success: false, err
    })
    return res.status(200).json({
      success: true
    })
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})