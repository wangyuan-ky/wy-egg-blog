/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [
      {
        name: '古文',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 1,
      },
      {
        name: '诗歌',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 1,
      },
      {
        name: '插画',
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
        name: 'Python',
        en_name: '英文名，后期扩展',
        user_id: 1,
        category_id: 3,
      },
      {
        name: 'React',
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
