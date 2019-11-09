const speakeasy = require('speakeasy')
const QRCode = require('qrcode')

class Otp {

  async constructor ({ name, email, display }) {
    this.name = name
    this.email = email
    this.display = display
    this.qrcodeGenerateUrl = 'https://ko.qr-code-generator.com/'

    this.secret = this.generateSeceret()
    this.url = this.generateUrl()
    this.qrcode = this.convertUrlToQrcode()
  }

  generateSeceret () {
    const s = speakeasy.generateSecret({
      length: 20,
      name: this.name,
      issuer: this.email
    });

    return s.ascii
  }

  static ifVerified (secret, token) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    });
  }

  generateUrl () {
    return speakeasy.otpauthURL({ 
      secret: this.secret, 
      issuer: this.display, // OTP앱에 표시되는 부분
      label: this.email,
      algorithm: 'sha512', 
      period : 300
    })
  }

  convertUrlToQrcode () {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(this.url, async (err, imgData) => {
        if (err) reject(err)
        return resolve(imgData)
      })
    })
  }

}

module.exports = {
  Otp
}