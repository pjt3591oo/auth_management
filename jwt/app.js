const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express();

const SECRET_KEY = "secret key"

// 회원가입 한 유저 정보
let registryUsers = {

}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('JWT_SECRET', SECRET_KEY) // JWT 인코딩/디코딩을 위해 필요한 키값

const loginCheck = (req,res, next) => {
  let { token } = req.headers
  let { JWT_SECRET } = app.settings

  if (!token) {
    return res.status(401).json({
      msg: '인증실패'
    })
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {

    if (!decoded) {
      return res.status(401).json({
        msg: '인증실패'
      })
    }
    
    req.user = {
      name: decoded.name
    }
    next()
  })
}

// 로그인
app.get('/', (req, res, next) => {  

  let { id, password } = req.query

  if ( !registryUsers[id] ) {
    return res.status(401).json({
      msg: 'login failed'
    })
  }

  if ( registryUsers[id].password !== password ) {
    return res.status(401).json({
      msg: 'login failed'
    })
  }

  let { JWT_SECRET } = app.settings
  let payload = { 
    name: registryUsers[id].name
  }
  let options = { } // registered 정보

  // JWT 토큰생성
  jwt.sign(payload, JWT_SECRET, options, (err, token) => {
    return res.status(201).json({
      token,
      msg: 'success'
    })
  })
});

// 회원가입
app.post('/', (req, res, next) => {
  let {id, password, name} = req.body
  
  if(registryUsers[id]) {
    return res.status(200).json({
      msg: '해당 아이디는 이미 등록되어있습니다.'
    })
  }

  // 유저정보 저장
  registryUsers[id] = {
    id,
    password,
    name
  }     

  return res.status(201).json({
    msg: 'success'
  })
})

// 로그인이 필요한 정보요청
app.get('/api', loginCheck, (req, res, next) => {
  return res.status(200).json({
    data: [1,2,3,4],
    post: [1,2,3,4,5],
    name: req.user.name
  })
})

app.listen(3000, () => {
  console.log('STARTING SERVER 3000 PORT');
});