/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const util = require('util');
const path = require('path');
const readFilePromise = util.promisify(fs.readFile);
class PageController extends Controller {

  /**
   * 打包后可以通过
   * http://rootUrl/  和 http://rootUrl/admin 来访问前台可后台
   * 在开发阶段直接通过webpack的devserver来访问，接口通过proxyTable来代理
   */
  async index() {
    const { ctx } = this;
    ctx.response.type = 'html';
    ctx.body = await readFilePromise(path.resolve(__dirname, '../public/client/dist/index.html'));
  }

  async admin() {
    const { ctx } = this;
    ctx.response.type = 'html';
    ctx.body = await readFilePromise(path.resolve(__dirname, '../public/admin/dist/index.html'));
  }
}

module.exports = PageController;

