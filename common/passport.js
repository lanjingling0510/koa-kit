'use strict';
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const WechatStrategy = require('passport-wechat').Strategy;
// const qqStrategy = require('passport-qq').Strategy;
const qqStrategy = require('./passport_qq_token').Strategy;
const config = require('../config.json');
const co = require('co');
const hashword = require('hashword');
const User = require('../models').User;


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function (username, password, done) {
  co(function* () {
    const admin = yield User.findOne({
      username: username
    });
    if (!admin) {
      return done(null, false);
    }
    if (!(hashword.checkPassword(password, admin.passhash))) {
      return done(null, false);
    }
    return done(null, admin);
  }).catch(function (err) {
    done(err);
  });
}));

passport.use(new JWTStrategy({
  secretOrKey: config.jwt.secret,
  issuer: config.jwt.issuer,
  audience: config.jwt.audience,
  tokenBodyField: 'bearer',
  tokenQueryParameterName: 'bearer',
  authScheme: 'Bearer',
  passReqToCallback: false
}, function (payload, done) {
  co(function* () {
    const admin = yield User.findById(payload.userId).exec();
    if (!admin) {
      return done(null, false);
    }
    done(null, admin);
  }).catch(function (err) {
    done(err);
  });
}));

passport.use('wechat-token', new WechatStrategy({
  appID: config.wechat.appID,
  appSecret: config.wechat.appID,
  name: 'wechat-token',
  client: 'wechat',
  callbackURL: 'http://www.cyt-rain.cn',
  scope: 'snsapi_userinfo',
  state: 'STATE'
},
  function (accessToken, refreshToken, profile, done) {
    if (!profile) {
      return done(null, false);
    }

    return done(null, profile);
  }
));

passport.use('qq-token', new qqStrategy({
  clientID: config.qq.appID,
  clientSecret: config.qq.appKEY,
  callbackURL: 'http://readme.cyt-rain.cn/auth/token/qq/callback'
},
  function (accessToken, refreshToken, profile, done) {
    if (!profile) {
      return done(null, false);
    }

    return done(null, profile);
  }
));


module.exports = passport;
