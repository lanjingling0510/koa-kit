'use strict';

const app = module.exports = require('koa')();
const cors = require('koa-cors');
const config = require('./config.json');
const logger = require('koa-logger');
const passport = require('./common/passport');
const debug = require('debug');

debug.enable('app:*');
const log = debug('app:');

//koaBodyParser(
//    {
//        formidable: {
//            uploadDir: __dirname,
//            maxFieldsSize: config.upload.limits.fileSize,
//        },
//        multipart: true,
//    }
//);


app.proxy = true;
app.name = config.name;

app
    .use(logger())
    .use(cors({
        origin: '*',
        headers: ['Content-Type', 'Authorization']
    }))
    .use(passport.initialize())
    .use(require('./users').routes());

app.on('error', function (err, ctx) {
    log('server error', err);
    ctx.body && console.error(ctx.body);
});

app.listen(config.port, function () {
    log('listen...');
});


