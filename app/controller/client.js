/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const Controller = require('egg').Controller;
class BlogController extends Controller {
  /**
   * 获取文章列表
   * 如果没传keyword，返回所有文章
   * 传入keywork返回根据keyword在标题和内容搜索的结果
   */
  async getArticleList() {
    const { ctx } = this;
    const { page = 1, keyword = '' } = ctx.query;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleList = await ctx.service.client.getAllArticleById(page, keyword);
    resMsg.data = {
      list: articleList.list,
      count: articleList.count,
    };
    ctx.body = resMsg;
  }

  /**
   * 根据分类id查询文章
   */
  async searchByCategory() {
    const { ctx } = this;
    const { page = 1, id = '' } = ctx.query;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleList = await ctx.service.client.searchByCategory(page, id);
    resMsg.data = {
      list: articleList.list,
      count: articleList.count,
    };
    ctx.body = resMsg;
  }

  /**
   * 根据标签id查询文章
   */
  async searchByTag() {
    const { ctx } = this;
    const { page = 1, id = '' } = ctx.query;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleList = await ctx.service.client.searchByTag(page, id);
    resMsg.data = {
      list: articleList.list,
      count: articleList.count,
    };
    ctx.body = resMsg;
  }

  /**
   * 根据文章id查询文章内容
   */
  async getArticleDetail() {
    const { ctx } = this;
    const articleId = ctx.request.body.id;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleDetail = await ctx.service.client.getArticleDetailByArticleId(articleId);
    resMsg.data = articleDetail[0];
    ctx.body = resMsg;
  }

  /**
   * 获取所有分类和标签及其数量
   */
  async getTagsAndCategories() {
    const { ctx } = this;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const [ categoriesCount, tagsCount ] = await Promise.all([
      ctx.service.client.getCategoriesCount(),
      ctx.service.client.getTagsCount(),
    ]);
    resMsg.data = {
      categoriesCount,
      tagsCount,
    };
    ctx.body = resMsg;
  }
}

module.exports = BlogController;
