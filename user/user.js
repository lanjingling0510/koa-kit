'use strict';

const router = require('koa-router')();
const passport = require('../common/passport');
const User = require('../models').User;
const hashword = require('hashword');
const debug = require('debug')('app:user');
const ObjectId = require('mongoose').Types.ObjectId;

/* ================================
 =       create User
 @api  post  /user
 ================================ */

const createUser = function* () {
    const ctx = this;
    const password = ctx.request.body.password;
    try {
        if (!(/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(password))) {
            throw new Error('密码长度为6-22!');
        }

        const user = {
            username: ctx.request.body.username,
            passhash: hashword.hashPassword(password),
            updatedAt: new Date()
        };

        yield User.createUser(user);
        ctx.body = '注册成功';
        ctx.status = 200;
    } catch (e) {
        ctx.body = e.message;
        ctx.status = 412;
    }
};


router.post('/', createUser);

module.exports = router;
