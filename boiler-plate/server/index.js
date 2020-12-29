const express = require('express')
const app = express()
const port = 5000
const { User } = require('./models/user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
const dotenv = require('dotenv')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

dotenv.config()
const password = process.env.DB_PASSWORD

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://david-kim:${password}@boilerplate.p2j4o.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected!'))
.catch(err => console.log(err))

app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {
  //find email from DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }
    //check if PW is correct
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) 
        return res.json({
          loginSuccess: false, 
          message: "비밀번호가 틀렸습니다"
        })
                
    //create token
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // save token in cookie
        res.cookie("x_autho", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user_id})
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id, 
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
    if (err) return res.json({success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req, res) => {
  res.send("Connected to server!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})