/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('blog');

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  });

  return conn.model('User', UserSchema);
};
