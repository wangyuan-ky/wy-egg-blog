/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const Service = require('egg').Service;
const { literal } = require('sequelize');
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
  async register(data) {
    const { email, password } = data;
    return this.ctx.model.User.create({
      email,
      password: generatePassWord(password),
    });
  }

  // 根据邮箱查找 正常用户
  async findUser(data) {
    const { email } = data;
    return this.ctx.model.User.findOne({
      where: { email, status: 1 },
    });
  }

  // 根据 ID 查找 正常用户
  async queryUserById(id) {
    return this.ctx.model.User.findOne({
      where: { id, status: 1 },
      attributes: [
        'id',
        'username',
        'email',
        'nickname',
        'avatar',
        'website',
        'github',
        'github',
        'gitee',
        'weibo',
        'profession',
        'summary',
        'account_type',
      ],
    });
  }

  // 更新用户帐号信息
  async updateAccount(params, id) {
    return this.ctx.model.User.update(params, { where: { id } });
  }

  // 阅读量+1
  async viewPlusOne(id) {
    return this.ctx.model.User.update(
      {
        total_view: literal('total_view + 1'),
      },
      {
        where: { id },
      }
    );
  }

  // 点赞量+1
  async favoritePlusOne(id) {
    return this.ctx.model.User.update(
      {
        total_like: literal('total_like + 1'),
      },
      {
        where: { id },
      }
    );
  }

  // 点赞量-1
  async favoriteReduceOne(id) {
    return this.ctx.model.User.update(
      {
        total_like: literal('total_like - 1'),
      },
      {
        where: { id },
      }
    );
  }

  // 评论量+1
  async commentPlusOne(id) {
    return this.ctx.model.User.update(
      {
        total_comment: literal('total_comment + 1'),
      },
      {
        where: { id },
      }
    );
  }
}

module.exports = LoginService;
