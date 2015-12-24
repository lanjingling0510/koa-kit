'use strict';

const router = require('koa-router')();
router.use('/test', require('./test').routes());
module.exports = router;
