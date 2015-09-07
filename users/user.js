'use strict';

const router = require('koa-router')();
const passport = require('../common/passport');
const User = require('../models').User;
const hashword = require('hashword');
const koaBodyParser = require('koa-body');

const createUser = function* () {
    const ctx = this;
    const user = {
        username: ctx.request.body.username,
        passhash: hashword.hashPassword(ctx.request.body.password),
        updatedAt: new Date()
    };
    try {
        if (yield User.create(user)) {
            ctx.body = 'success';
            ctx.status = 200;
        }
    } catch (e) {
        console.error(e);
    }
};

router.post('/', koaBodyParser(), createUser);


//router.use(passport.authenticate('jwt', {session: false}));

module.exports = router;
