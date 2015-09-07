'use strict';

const mongoose = require('../common/db').mongoose;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    passhash: String,
    type: {
        type: String,
        default: 'root'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
},  {collection: 'Users'});


const User = mongoose.model('User', UserSchema);

module.exports = User;
