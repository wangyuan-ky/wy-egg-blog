/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
const Sequelize = require('sequelize');
const { literal } = require('sequelize');
const { generatePassWord } = require('../extend/helper');
const Op = Sequelize.Op;

const Service = require('egg').Service;
class BlogService extends Service {

  async getAllArticleById(page, keyword) {
    const pageSize = '10';
    const where = {
      status: 1,
      [Op.or]: [
        { title: { [Op.like]: `%${keyword || ''}%` } },
        { content: { [Op.like]: `%${keyword || ''}%` } },
      ],
    };
    const { ctx } = this;

    const { count, rows } = await ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
      attributes: [
        'view', // 查看数
        'title', // 文章标题
        'favorite', // 点赞数
        'id', // 文章ID
        'content', // 文章markdown
        'comment', // 评论
        'cover', // 封面
        'createdAt', // 创建时间
      ],
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tag',
        },
        {
          model: this.ctx.model.Category,
          as: 'category',
        },
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username', 'email', 'nickname' ],
        },
      ],
    });

    // 截出预览部分
    rows.map(item => {
      item.content = item.content.split('<!-- more -->')[0];
      // item.content = item.content.substring(0, 100);
      return item;
    });
    return {
      list: rows,
      count,
    };
  }

  async searchByCategory(page, id) {
    const keyword = '';
    const pageSize = '10';
    const where = {
      status: 1,
      category_id: id,
      [Op.or]: [
        { title: { [Op.like]: `%${keyword || ''}%` } },
        { content: { [Op.like]: `%${keyword || ''}%` } },
      ],
    };
    const { ctx } = this;

    const { count, rows } = await ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
      attributes: [
        'view', // 查看数
        'title', // 文章标题
        'favorite', // 点赞数
        'id', // 文章ID
        'content', // 文章markdown
        'comment', // 评论
        'cover', // 封面
        'createdAt', // 创建时间
      ],
      include: [
        {
          model: ctx.model.Tag,
          as: 'tag',
        },
        {
          model: ctx.model.Category,
          as: 'category',
        },
        {
          model: ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username', 'email', 'nickname' ],
        },
      ],
    });

    // 截出预览部分
    rows.map(item => {
      if (item.content && item.content.split) {
        item.content = item.content.split('<!-- more -->')[0];
      }
      return item;
    });
    return {
      list: rows,
      count,
    };
  }

  async searchByTag(page, id) {
    const keyword = '';
    const pageSize = '10';
    const where = {
      status: 1,
      tag_id: id,
      [Op.or]: [
        { title: { [Op.like]: `%${keyword || ''}%` } },
        { content: { [Op.like]: `%${keyword || ''}%` } },
      ],
    };
    const { ctx } = this;

    const { count, rows } = await ctx.model.Article.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
      attributes: [
        'view', // 查看数
        'title', // 文章标题
        'favorite', // 点赞数
        'id', // 文章ID
        'content', // 文章markdown
        'comment', // 评论
        'cover', // 封面
        'createdAt', // 创建时间
      ],
      include: [
        {
          model: ctx.model.Tag,
          as: 'tag',
        },
        {
          model: ctx.model.Category,
          as: 'category',
        },
        {
          model: ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username', 'email', 'nickname' ],
        },
      ],
    });

    // 截出预览部分
    rows.map(item => {
      if (item.content && item.content.split) {
        item.content = item.content.split('<!-- more -->')[0];
      }
      return item;
    });
    return {
      list: rows,
      count,
    };
  }

  async getArticleDetailByArticleId(id) {
    const { ctx } = this;
    return await ctx.model.Article.findOne({
      where: { id },
      include: [
        {
          model: ctx.model.Tag,
          as: 'tag',
        },
        {
          model: ctx.model.Category,
          as: 'category',
        },
        {
          model: ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
            'github',
            'weibo',
            'website',
            'gitee',
          ],
        },
      ],
    });
  }

  // 获取分类及数量
  async getCategoriesCount() {
    const { ctx } = this;
    const categories = await ctx.model.Category.findAll({
      where: { status: 1 },
      include: [
        {
          model: ctx.model.Tag,
          as: 'tags',
        },
      ],
    });
    const res = [];
    for (let index = 0; index < categories.length; index++) {
      const item = categories[index];
      const articleList = await ctx.model.Article.findAll({
        where: { status: 1, category_id: item.id },
        order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
        include: [
          {
            model: ctx.model.Tag,
            as: 'tag',
          },
          {
            model: ctx.model.Category,
            as: 'category',
          },
          {
            model: ctx.model.User,
            as: 'user',
            attributes: [ 'id', 'username', 'email', 'nickname' ],
          },
        ],
      });
      res.push({
        count: articleList.length,
        name: item.name,
        category_id: item.id,
      });
    }
    return res;
  }

  // 获取标签及数量
  async getTagsCount() {
    const { ctx } = this;
    const tags = await ctx.model.Tag.findAll({
      where: { status: 1 },
    });
    const res = [];
    for (let index = 0; index < tags.length; index++) {
      const item = tags[index];
      const articleList = await ctx.model.Article.findAll({
        where: { status: 1, tag_id: item.id },
        order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
        include: [
          {
            model: ctx.model.Tag,
            as: 'tag',
          },
          {
            model: ctx.model.Category,
            as: 'category',
          },
          {
            model: ctx.model.User,
            as: 'user',
            attributes: [ 'id', 'username', 'email', 'nickname' ],
          },
        ],
      });
      res.push({
        count: articleList.length,
        name: item.name,
        tag_id: item.id,
      });
    }
    return res;
  }

  // [前台] 获取热门文章列表
  async hots() {
    return this.ctx.model.Article.findAll({
      order: [[ 'view', 'DESC' ]],
      limit: 10,
      attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
    });
  }

  async viewPlusOne(id) {
    return this.ctx.model.Article.update(
      {
        view: literal('view + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoritePlusOne(id) {
    return this.ctx.model.Article.update(
      {
        favorite: literal('favorite + 1'),
      },
      {
        where: { id },
      }
    );
  }

  async favoriteReduceOne(id) {
    return this.ctx.model.Article.update(
      {
        favorite: literal('favorite - 1'),
      },
      {
        where: { id },
      }
    );
  }

  async commentPlusOne(id) {
    if (!id) {
      return;
    }
    return this.ctx.model.Article.update(
      {
        comment: literal('comment + 1'),
      },
      {
        where: { id },
      }
    );
  }

  // [前/后 台] 获取文章评论列表
  async comments(query) {
    const where = { status: 1 };
    if (query) where.article_id = query.id;
    return this.ctx.model.Comment.findAll({
      where,
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
        {
          model: this.ctx.model.Article,
          as: 'article',
          attributes: [ 'view', 'title', 'favorite', 'id', 'comment' ],
        },
      ],
    });
  }

  async createToursitComment(params) {
    const { email, nickname, website } = params;
    let user = await this.ctx.model.User.findOne({
      where: { email: params.email },
    });
    if (!user) {
      user = await this.ctx.model.User.create({
        email,
        nickname,
        website,
        account_type: 'TOURIST',
        password: generatePassWord(params.email),
      });
    }
    const result = await this.ctx.model.Comment.create({
      ...params,
      user_id: user.id,
    });
    return await this.ctx.model.Comment.findOne({
      where: { id: result.id },
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
      ],
    });
  }

  async createComment(params, user_id) {
    const result = await this.ctx.model.Comment.create({
      ...params,
      user_id,
    });

    return await this.ctx.model.Comment.findOne({
      where: { id: result.id },
      include: [
        {
          model: this.ctx.model.User,
          as: 'user',
          attributes: [
            'id',
            'username',
            'email',
            'nickname',
            'total_view',
            'total_like',
            'total_comment',
            'profession',
            'avatar',
          ],
        },
      ],
    });
  }

}

module.exports = BlogService;
