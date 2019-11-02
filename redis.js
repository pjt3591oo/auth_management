const express = require('express');
const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session);
const redis = require('redis')
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const options = {
  url: '127.0.0.1', 
  port: 6379,
  logErrors: true, 
  prefix: "session:",
  client: redis.createClient(6379, "localhost")
}

app.use(session({  
  secret: 'pjt는 잘 생겼다!!!',  
  resave: false,
  saveUninitialized: true,
  store: new RedisStore(options),
  cookie: {
    maxAge: 1000 * 60,
    path: '/test'
  }
}));


app.get('/', (req, res, next) => {  
  console.log(req.sessionID, req.session);
  
  req.session.num = req.session.num || 0
  req.session.num += 1

  return res.json({num : req.session});
});

app.listen(3000, () => {
  console.log('STARTING SERVER 3000 PORT');
});