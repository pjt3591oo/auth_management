const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출
    console.log('serializeUser', user)
    done(null, user); 
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log('deserializeUser', user)
    done(null, user); // 두번째 인자로 전달된 데이터는 req.user에 저장됨
  });

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
  }, function (req, username, password, done) {
    console.log('*******')
    console.log(username, password)
    if (username === 'mung' && password === 'mung') {
      return done(null, {
        'uid': username,
      });
    } else {
      return done(false, null)
    }
  }));
};