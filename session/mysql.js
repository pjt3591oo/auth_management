const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'session',
  charset: 'utf8mb4_bin',

  // Whether or not to automatically check for and clear expired sessions:
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,

  schema: {
      tableName: 'sessions',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }
};

app.use(session({  
  secret: 'pjt는 잘 생겼다!!!',  
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore(options),
  cookie: {
    maxAge: 1000 * 60
  }
}));

app.get('/', (req, res, next) => {  
  console.log(req.sessionID, req.session);
  
  req.session.num = req.session.num || 0
  req.session.num += 1

  return res.json({num : req.session.num});
});

app.listen(3000, () => {
  console.log('STARTING SERVER 3000 PORT');
});