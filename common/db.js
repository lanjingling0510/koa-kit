'use strict';

const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(config.mongoose.url);

exports.mongoose = mongoose;

