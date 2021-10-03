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
        enName: 'prose',
        categoryId: 1,
      },
      {
        name: '诗歌',
        enName: 'poetry',
        categoryId: 1,
      },
      {
        name: '插画',
        enName: 'inbetweening',
        categoryId: 2,
      },
      {
        name: '测试',
        enName: 'test',
        categoryId: 2,
      },
      {
        name: 'Node',
        enName: 'node',
        categoryId: 3,
      },
      {
        name: 'Egg',
        enName: 'egg',
        categoryId: 3,
      },
      {
        name: 'Python',
        enName: 'python',
        categoryId: 3,
      },
      {
        name: 'React',
        enName: 'react',
        categoryId: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
