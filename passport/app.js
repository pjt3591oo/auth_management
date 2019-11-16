const http = require('http')
const express = require('express');

const passport = require('passport');

const cookieParser = require('cookie-parser');

const logger = require('morgan');

const session = require('express-session'); // 세션 설정

const USER_API = require('./routes/user.js')
const passport_strategy = require('./passport_strategy.js')

const app = express();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ 
  secret: 'mung key', 
  resave: true, 
  saveUninitialized: false
})); 

app.use(passport.initialize())
app.use(passport.session())

passport_strategy()

app.use('/API/user', USER_API)

app.use((req, res) => {
  return res.status(404).end()
})

var server = http.createServer(app);
server.listen(3000, () => {
  console.log('server start')
})