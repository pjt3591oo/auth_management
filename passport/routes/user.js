const express = require('express')
const router = express.Router();

const passport = require('passport')

// 세션확인
router.get('/', (req, res) => {
  return res.status(200).json({...req.session, ...req.user})
})

// 로그인
router.post('/signin',  passport.authenticate('local', {failureRedirect: '/API/user/fail'}), (req, res) => {
  console.log('signin')
  return res.status(201).json({
    msg: 'signin success'
  })
})

// 회원가입
router.post('/signup', (req, res) => {
  return res.status(201).json({
    msg: 'signup success'
  })
})

// 로그인 실패시 새로고침 페이지
router.get('/fail', (req, res) => {
  return res.status(200).json({
    msg:"login fail"
  })
})

module.exports = router;