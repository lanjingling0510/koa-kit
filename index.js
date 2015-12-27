'use strict';

require('babel-register');
const app = require('koa')();
const cors = require('koa-cors');
const config = require('./config.json');
const logger = require('koa-logger');
const passport = require('./common/passport');
const debug = require('debug')('app:index');
const koaBody = require('koa-body');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
require('./chat/chat.js');


app.proxy = true;
app.name = config.name;

app.use(koaBody({
  formidable: {
    uploadDir: __dirname,
    maxFieldsSize: config.upload.limits.fileSize
  },
  multipart: true
}));

app
  .use(logger())
  .use(conditional())
  .use(etag())
  .use(cors({
    origin: '*'
  }))
  .use(passport.initialize())
  .use(require('./v1').routes());

app.on('error', function (err, ctx) {
  log('server error', err);
  ctx.body && debug(ctx.body);
});

app.listen(config.port, function () {
  debug('listen%s...', config.port);
});
