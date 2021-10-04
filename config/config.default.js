/* eslint valid-jsdoc: "off" */

/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const { USERNAME, PASSWORD, PORT, HOST, DATABASE, EXPIRES, SECRET } = require('./secret');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.keys = appInfo.name + '_1586057841215_9419';
  config.jwt = {
    cert: SECRET, // jwt秘钥
  };
  config.session = {
    maxAge: EXPIRES,
  };

  config.user = { // 初始化管理员的账号
    userName: 'admin',
    password: 'admin',
  };

  config.qiniu = { // 七牛的Access Key和Secret Key
    ak: 'pZN1Fwwn7Qij9ICkZWdD7GAlzbr25hO6pNxUlsUg',
    sk: '_ryoxhPTzEqvJSbL9o7DexlkkzLH0hwIis7FXg4i',
  };

  // add your middleware config here
  config.middleware = [ 'auth' ];

  config.auth = {
    enable: true,
    ignore: [
      /** admin 无需授权 路由过滤 */
      '/getCaptcha', // 获取图片验证码
      '/login', // 帐号密码登录

      /** client 无需授权 路由过滤 */
      '/c/getArticleList', // 获取所有文章列表，如果有传 keyword,则根据 keyword 搜索
      '/c/getArticleDetail', // 获取文章详情
      '/c/getTagsAndCategories', // 获取标签云（标签列表，分类列表）
      '/c/searchByCategory', // 根据 分类ID 获取文章列表
      '/c/searchByTag', // 根据 标签ID 获取文章列表
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
