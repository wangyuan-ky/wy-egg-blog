/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, ENUM, DATE } = app.Sequelize;
  const User = app.model.define('users', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '行ID',
    },
    username: {
      type: STRING(50),
      defaultValue: null,
      comment: '用户名',
    },
    password: {
      type: STRING(200),
      defaultValue: null,
      comment: '密码',
    },
    email: {
      type: STRING(100),
      defaultValue: null,
      comment: '电子邮箱',
    },
    nickname: {
      type: STRING(300),
      defaultValue: null,
      comment: '昵称',
    },
    avatar: {
      type: STRING(300),
      defaultValue: null,
      comment: '头像',
    },
    website: {
      type: STRING(300),
      defaultValue: null,
      comment: '个人网址',
    },
    github: {
      type: STRING(300),
      defaultValue: null,
      comment: 'github地址',
    },
    gitee: {
      type: STRING(300),
      defaultValue: null,
      comment: 'gitee地址',
    },
    weibo: {
      type: STRING(300),
      defaultValue: null,
      comment: '微博',
    },
    totalView: {
      type: INTEGER,
      defaultValue: 0,
      comment: '总访问量',
    },
    totalLike: {
      type: INTEGER,
      defaultValue: 0,
      comment: '总喜欢数',
    },
    totalComment: {
      type: INTEGER,
      defaultValue: 0,
      comment: '总评论数',
    },
    profession: {
      type: STRING(100),
      defaultValue: null,
      comment: '职业',
    },
    summary: {
      type: TEXT,
      defaultValue: null,
      comment: '用户简介或签名',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '用户状态：1->正常,2->删除',
    },
    accountType: {
      type: ENUM('ADMIN', 'GENERAL', 'TOURIST'),
      defaultValue: 'GENERAL',
      comment: '帐号类型',
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
  User.associate = () => {
    app.model.User.hasMany(app.model.Article, { foreignKey: 'userId' });
    app.model.User.hasMany(app.model.Comment, { foreignKey: 'userId' });
  };
  return User;
};
