/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('blog');

  const TagSchema = new Schema({
    tagName: { type: String },
    // count: { type: Number },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  return conn.model('Tag', TagSchema);
};
