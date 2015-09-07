'use strict';

const router = require('koa-router')();
router.prefix('/apis');
router.use('/auth', require('./auth').routes());
router.use('/user', require('./user').routes());
module.exports = router;

