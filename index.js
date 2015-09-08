'use strict';

const app = module.exports = require('koa')();
const cors = require('koa-cors');
const config = require('./config.json');
const logger = require('koa-logger');
const passport = require('./common/passport');
const debug = require('debug');
const koaBody = require('koa-body');
const crypto = require('crypto');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
debug.enable('app:*');
const log = debug('app:');


process.name = config.name;
app.proxy = true;
app.name = config.name;

app.use(koaBody(
    {
        formidable: {
            uploadDir: __dirname,
            maxFieldsSize: config.upload.limits.fileSize
        },
        multipart: true
    }
));

app
    .use(logger())
    .use(conditional())
    .use(etag())
    .use(cors({origin: '*'}))
    .use(passport.initialize())
    .use(require('./users').routes());

app.on('error', function (err, ctx) {
    log('server error', err);
    ctx.body && log(ctx.body);
});

app.listen(config.port, function () {
    log('listen...');
});


