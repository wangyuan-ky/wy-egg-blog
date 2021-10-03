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
        enName: 'literature',
      },
      {
        name: '艺术',
        enName: 'art',
      },
      {
        name: '后端',
        enName: 'backend',
      },
      {
        name: '前端',
        enName: 'frontend',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
