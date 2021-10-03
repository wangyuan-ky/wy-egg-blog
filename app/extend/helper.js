/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
const crypto = require('crypto');
const { SECRET } = require('../../config/secret');


const generatePassWord = str => {
  return crypto.createHmac('sha256', SECRET).update(str).digest('hex');
};

module.exports = {
  generatePassWord,
};
