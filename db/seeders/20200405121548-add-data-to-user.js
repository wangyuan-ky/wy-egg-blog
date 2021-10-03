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
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/001.png',
        profession: '全栈工程师',
        website: 'https://github.com/wangyuan-ky',
        github: 'https://github.com/wangyuan-ky/immisso',
        gitee: 'https://github.com/wangyuan-ky',
        accountType: 'ADMIN',
        totalView: 90,
        totalLike: 0,
        totalComment: 0,
      },
      {
        username: 'someone',
        password: generatePassWord('someone'),
        email: 'someone@163.com',
        nickname: '大神',
        avatar: 'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/002.png',
        profession: '前端开发工程师',
        website: 'https://github.com/wangyuan-ky',
        github: 'https://github.com/wangyuan-ky',
        gitee: 'https://github.com/wangyuan-ky',
        totalView: 5001,
        totalLike: 0,
        totalComment: 0,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
