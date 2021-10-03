/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        defaultValue: null,
        validate: {
          isEmail: true,
        },
      },
      nickname: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: '用户头像',
      },
      website: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: '个人网址',
      },
      github: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: 'github地址',
      },
      gitee: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: 'gitee地址',
      },
      weibo: {
        type: Sequelize.STRING(300),
        defaultValue: null,
        comment: '微博',
      },
      totalView: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalLike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalComment: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      profession: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      summary: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: '用户简介或签名',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '1->正常,2->删除',
      },
      accountType: {
        type: Sequelize.ENUM('ADMIN', 'GENERAL', 'TOURIST'),
        defaultValue: 'GENERAL',
      },
      createdTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedTime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }).then(() => queryInterface.addIndex('users', [ 'email', 'status', 'accountType' ]));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
