/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: '思想品德',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
      {
        name: '语文',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
      {
        name: '数学',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
      {
        name: '外语',
        user_id: 1,
        en_name: '英文名，后期扩展',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
