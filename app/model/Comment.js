/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const { INTEGER, TEXT, DATE } = app.Sequelize;
  const Comment = app.model.define('comments', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '行ID',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      comment: '用户ID',
    },
    articleId: {
      type: INTEGER,
      allowNull: false,
      comment: '文章ID',
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '评论内容',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '分类状态：1->正常,2->删除',
    },
    createTime: {
      type: DATE,
      comment: '创建时间',
    },
    updateTime: {
      type: DATE,
      comment: '更新时间',
    },
  });
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.Article, { as: 'article' });
    app.model.Comment.belongsTo(app.model.User, { as: 'user', foreignKey: 'userId' });
  };
  return Comment;
};

