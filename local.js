const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(session({  
  // genid: function(req) {
  //   return new Date().getTime() // use UUIDs for session IDs
  // }, 
  secret: 'pjt는 잘 생겼다!!!',  // 세션 암호화할 때 사용하는 키값
  name: 'pjt',                // 웹 브라우저에서 해당 세션 이름을 의미 (defailt: connect.sid)
  resave: false,              // true로 할 경우 값이 바뀌지 않더라도 새로저장
  saveUninitialized: true,    // 초기화하지 않은 상태로 저장(어느 API로 호출하던지 세션생성)
  cookie: {                   // 클라이언트 쿠기
    path: '/', 
    httpOnly: true, 
    secure: false, 
    maxAge: null,              // expire
    domain: 'blog.naver.com/pjt3591oo'
  }
}));

app.get('/test', (req,res) => {
  console.log(req.sessionID, req.session);
  // req.session.num = req.session.num || 0
  // req.session.num += 1
  
  return res.json({num : req.session.num});
})

app.get('/', (req, res, next) => {  
  console.log(req.sessionID, req.session);
  
  req.session.num = req.session.num || 0
  req.session.num += 1
  
  return res.json({num : req.session.num});
});

app.listen(3000, () => {
  console.log('STARTING SERVER 3000 PORT');
});