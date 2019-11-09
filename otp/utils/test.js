const { Otp } = require('./otp')

let o = new Otp({
  name: 'JeongTae Park',
  display: 'OTP TEST',
  email: 'pjt3591oo@gmale.com'
})

;(async() => {
  let a = await o.qrcode
  o.qrcode = a
  console.log(o)
})()
