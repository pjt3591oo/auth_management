const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session); 
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(session({  
  secret: 'pjt는 완죤 멋있다!!!!',  
  resave: false,
  saveUninitialized: true,
  store: new FileStore(),
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