const speakeasy = require('speakeasy')

const secret = 'IRRGOXRKIYWCY5CRGQSV23Z7OF4WMXJT'
const token = '561178'

var verified = speakeasy.totp.verify({
  secret: secret,
  encoding: 'base32',
  token: token
});

console.log(verified)