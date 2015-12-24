'use strict';

const router = require( 'koa-router' )();

const jsonTest = function* () {
  const ctx = this;
  const query = ctx.query;
  let result;
  if ( query.name === 'cyt' ) {
    result = {
      '_id': 'falfafdasdf',
      'name': 'cyt',
      'id': '01',
      'sex': '男',
      'subjects': [ {
        '_id': 'jflkssdkffdssdfl',
        'name': '语文'
      }, {
        '_id': 'jflksdfjsdkfsdfl',
        'name': '数学'
      } ]
    };
  } else {
    result = {
      '_id': 'flkgjlfdkgjldf',
      'name': 'wq',
      'id': '01',
      'sex': '女',
      'subjects': [ {
        '_id': 'nvbcvbcxvbxcvxcvx',
        'name': '英语'
      }, {
        '_id': 'jflksdfjsdkfsdfl',
        'name': '数学'
      } ]
    };
  }

  this.body = result;
  this.status = 200;
};


router.get( '/', jsonTest );

module.exports = router;
