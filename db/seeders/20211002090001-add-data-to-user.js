/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
const { generatePassWord } = require('../../app/extend/helper');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'wangyuan',
        password: generatePassWord('wangyuan-ky'),
        email: '342007229@qq.com',
        nickname: '王媛',
        avatar: 'http://r0nyfn75a.hb-bkt.clouddn.com/me.jpg',
        profession: '全栈工程师',
        website: 'https://github.com/wangyuan-ky',
        github: 'https://github.com/wangyuan-ky/immisso',
        gitee: 'https://github.com/wangyuan-ky',
        account_type: 'ADMIN',
        total_view: 90,
        total_like: 0,
        total_comment: 0,
      },
      {
        username: 'someone',
        password: generatePassWord('someone'),
        email: 'someone@163.com',
        nickname: '大神',
        avatar: 'http://r0nyfn75a.hb-bkt.clouddn.com/me.jpg',
        profession: '前端开发工程师',
        website: 'https://github.com/wangyuan-ky',
        github: 'https://github.com/wangyuan-ky',
        gitee: 'https://github.com/wangyuan-ky',
        total_view: 5001,
        total_like: 0,
        total_comment: 0,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
