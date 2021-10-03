/* eslint valid-jsdoc: "off" */

/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const { USERNAME, PASSWORD, PORT, HOST, DATABASE, EXPIRES } = require('./secret');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.keys = appInfo.name + '_153332185447_3632';
  config.jwt = {
    cert: 'huanggegehaoshuai', // jwt秘钥
  };
  config.session = {
    maxAge: EXPIRES,
  };

  config.user = { // 初始化管理员的账号
    userName: 'admin',
    password: 'admin',
  };

  config.qiniu = { // 七牛的Access Key和Secret Key
    ak: '',
    sk: '',
  };

  // add your middleware config here
  config.middleware = [ 'auth' ];

  config.auth = {
    enable: true,
    ignore: [
      '/api/categories',
      '/api/login',
      '/api/register',
      '/api/articles',
      '/api/hot',
      '/api/detail',
      '/api/comments',
      '/api/tags',
      '/api/toursit/comment',
    ],
  };

  config.sequelize = {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: DATABASE,
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    logging: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    onerror: {
      all(err, ctx) {
        ctx.status = 200;
        ctx.body = { status: err.status, message: err.message };
      },
    },
  };

  return { ...config, ...userConfig };
};
