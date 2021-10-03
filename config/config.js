/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const { USERNAME, HOST, PASSWORD, DATABASE } = require('./secret');

module.exports = {
  development: {
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'mysql',
  },

};
