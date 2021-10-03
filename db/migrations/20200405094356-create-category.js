/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      en_name: {
        type: Sequelize.STRING(50),
        defaultValue: null,
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
    }).then(() => queryInterface.addIndex('categories', [ 'en_name', 'status' ]));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  },
};
