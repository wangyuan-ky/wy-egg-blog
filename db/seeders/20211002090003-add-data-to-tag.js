/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
      {
        name: '美文',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 1,
      },
      {
        name: '风景',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 1,
      },
      {
        name: '美图',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 2,
      },
      {
        name: '测试',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 2,
      },
      {
        name: 'Node',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 3,
      },
      {
        name: 'Egg',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 3,
      },
      {
        name: 'Java',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 3,
      },
      {
        name: 'Vue',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
