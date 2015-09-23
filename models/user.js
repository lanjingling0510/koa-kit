'use strict';

const mongoose = require('../common/db').mongoose;
const mongooseValidateFilter = require('mongoose-validatefilter');
const validate = new mongooseValidateFilter.validate();
const filter = new mongooseValidateFilter.filter();

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true},
    passhash: String,
    type: {type: String, default: 'user'},
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date
}, {collection: 'Users',  versionKey: false});

/*  =================
 =   静态方法
 ==================  */

UserSchema.statics.createUser = function (newData) {
    return new Promise((resolve, reject) => {
        this.createOne(newData, function (err, doc) {
            if (err) reject(err);
            resolve(doc);
        });
    });
};

//  ==========username===========
validate.add('username', {
    trim: true,
    required: true,
    msg: '账号不能为空！'
});

validate.add('username', {
    regExp: /\w{6,20}/,
    msg: '用户名在6-20字符之间'
});

validate.add('username', {
    callback: function (value, respond) {
        const username = String(value).trim();
        this.model('User').findOne({
            username: username
        })
            .then(function (doc) {
                respond(!doc);
            })
            .catch(function (e) {
                return respond(e);
            });
    },
    msg: '账号已被注册'
});

filter.add('username', 'trim');

//  ============nickname==============

validate.add('nickname', {
    exist: true,
    regExp: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
    msg: '昵称含有特殊符号'
});


mongooseValidateFilter.validateFilter(UserSchema, validate, filter);

const User = mongoose.model('User', UserSchema);

module.exports = User;
