/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: '文学',
        user_id: 1,
        en_name: 'literature',
      },
      {
        name: '艺术',
        user_id: 1,
        en_name: 'art',
      },
      {
        name: '后端',
        user_id: 1,
        en_name: 'backend',
      },
      {
        name: '前端',
        user_id: 1,
        en_name: 'frontend',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
