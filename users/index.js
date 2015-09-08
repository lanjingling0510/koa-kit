'use strict';

const router = require('koa-router')();
router.use('/auth', require('./auth').routes());
router.use('/user', require('./user').routes());
module.exports = router;

