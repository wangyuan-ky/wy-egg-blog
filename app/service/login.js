/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const { generatePassWord } = require('../extend/helper');
const { EXPIRES } = require('../../config/secret');

class LoginService extends Service {

  // 生成验证码
  genCaptcha() {
    return svgCaptcha.create({
      width: 85,
      height: 38,
    });
  }

  // 检查验证码是否正确
  checkCaptcha(code) {
    const { ctx } = this;
    code = code.toLowerCase();
    const sessCode = ctx.session.code ? ctx.session.code.toLowerCase() : null; // 拿到之前存在session中的验证码
    // 进行验证
    if (code === sessCode) {
      // 成功后验证码作废
      ctx.session.code = null;
    }
    return code === sessCode;
  }

  // 登录操作
  async login({ username, password }) {
    const { ctx, app } = this;
    const userData = await ctx.model.User.findOne({
      where: {
        username,
        status: 1,
        password: generatePassWord(password),
      },
    });

    // 找不到则返回 false
    if (!userData || !userData.username) {
      return false;
    }
    // 找到则以用户id生成token
    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        type: userData.account_type,
      },
      app.config.jwt.cert,
      {
        expiresIn: EXPIRES, // token过期时间
      }
    );
    return {
      user: userData,
      token,
    };
  }
}

module.exports = LoginService;
