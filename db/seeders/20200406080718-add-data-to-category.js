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
        en_name: '英文名，后期扩展',
      },
      {
        name: '艺术',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
      {
        name: '后端',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
      {
        name: '前端',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
