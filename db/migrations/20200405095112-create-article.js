/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('articles', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: null,
        comment: '文章标题',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      content: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: '文本内容',
      },
      html: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'html内容',
      },
      abstract: {
        type: Sequelize.STRING(500),
        defaultValue: null,
      },
      markdown: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'markdown内容',
      },
      anchor: {
        type: Sequelize.TEXT,
        defaultValue: null,
        comment: 'anchor',
      },
      article_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '字数',
      },
      favorite: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '点赞数',
      },
      view: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '查看数',
      },
      comment: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '评论数',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        comment: '1->正常,2->删除',
      },
      create_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      update_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }).then(() => queryInterface.addIndex('articles', [ 'status' ]));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('articles');
  },
};
