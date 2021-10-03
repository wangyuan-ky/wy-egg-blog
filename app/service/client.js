/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
const Sequelize = require('sequelize');
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
      order: [[ 'create_time', 'DESC' ]], // 创建时间，倒序
      attributes: [
        'view', // 查看数
        'title', // 文章标题
        'favorite', // 点赞数
        'id', // 文章ID
        'comment', // 评论
        'cover', // 封面
        'create_time', // 创建时间
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
      return item;
    });
    return {
      rows,
      count,
    };
  }

  async searchByCategory(page, id) {
    const { ctx } = this;
    // let list = await ctx.model.Article.find({ category_id: id })
    const [ list, count ] = await Promise.all([
      ctx.model.Article.find({ status: 0, category_id: id }, { html: 0 }).populate([{ path: 'tag_id', select: 'tagName' }, { path: 'category_id', select: 'categoryName' }]).limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, category_id: id }, { html: 0 }).count(),
    ]);
    // 截出预览部分
    list.map(item => {
      item.content = item.content.split('<!-- more -->')[0];
      return item;
    });
    return {
      list,
      count,
    };
  }

  async searchByTag(page, id) {
    const { ctx } = this;
    const [ list, count ] = await Promise.all([
      ctx.model.Article.find({ status: 0, tag_id: id }, { html: 0 }).populate([{ path: 'tag_id', select: 'tagName' }, { path: 'category_id', select: 'categoryName' }]).limit(10)
        .skip((page - 1) * 10),
      ctx.model.Article.find({ status: 0, tag_id: id }, { html: 0 }).count(),
    ]);
    // 截出预览部分
    list.map(item => {
      item.content = item.content.split('<!-- more -->')[0];
      return item;
    });
    return {
      list,
      count,
    };
  }

  async getArticleDetailByArticleId(id) {
    const { ctx } = this;
    return await ctx.model.Article.find({ _id: id }, { html: 0 }).populate([{ path: 'tag_id', select: 'tagName' }, { path: 'category_id', select: 'categoryName' }]);
  }

  // 获取分类及数量
  async getCategoriesCount() {
    const { ctx } = this;
    const categories = await ctx.model.Category.find({}, { __v: 0, user_id: 0 });
    const res = [];
    for (let index = 0; index < categories.length; index++) {
      const item = categories[index];
      const count = await ctx.model.Article.find({ status: 0, category_id: item._id }).count();
      res.push({
        count,
        categoryName: item.categoryName,
        category_id: item._id,
      });
    }
    return res;
  }

  // 获取标签及数量
  async getTagsCount() {
    const { ctx } = this;
    const tags = await ctx.model.Tag.find({}, { __v: 0, user_id: 0 });
    const res = [];
    for (let index = 0; index < tags.length; index++) {
      const item = tags[index];
      const count = await ctx.model.Article.find({ status: 0, tag_id: item._id }).count();
      res.push({
        count,
        tagName: item.tagName,
        tag_id: item._id,
      });
    }
    return res;
  }

}

module.exports = BlogService;
