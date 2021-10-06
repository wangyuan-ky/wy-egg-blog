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
    const article_id = ctx.request.body.id;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleDetail = await ctx.service.client.getArticleDetailByArticleId(article_id);
    resMsg.data = articleDetail;
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

  // [前台] 获取热门文章列表
  async hot() {
    const { ctx } = this;
    const hot = await ctx.service.client.hots();
    ctx.body = {
      errcode: 0,
      data: hot,
      msg: 'success',
    };
  }

  // [前台] 获取文章评论列表
  async comments() {
    const { ctx } = this;
    const comments = await ctx.service.client.comments(ctx.query);
    ctx.body = {
      errcode: 0,
      data: comments,
      msg: 'success',
    };
  }

  // [前台] 游客进行评论
  async toursitComment() {
    const { ctx } = this;

    const { author, article_id } = ctx.request.body;
    const [ comment ] = await Promise.all([
      ctx.service.client.createToursitComment(ctx.request.body),
      ctx.service.client.commentPlusOne(author),
      ctx.service.login.commentPlusOne(article_id),
    ]);
    ctx.body = {
      errcode: 0,
      data: comment,
      msg: 'success',
    };
  }

  // [前台] 博主进行评论
  async createComment() {
    const { ctx } = this;
    const { user_id } = ctx.locals;
    const { author, article_id } = ctx.request.body;
    const [ comment ] = await Promise.all([
      ctx.service.client.createComment(ctx.request.body, user_id),
      ctx.service.client.commentPlusOne(author),
      ctx.service.login.commentPlusOne(article_id),
    ]);
    ctx.body = {
      errcode: 0,
      data: comment,
      msg: 'success',
    };
  }

  // [前台] 更新用户对文章的点赞状态
  async updateFavorite() {
    const { ctx } = this;
    const { user_id: favorite_id } = ctx.locals;
    const { id: article_id, author } = ctx.request.body;
    const favortie = await ctx.service.favortie.findOne(favorite_id, article_id);
    if (!favortie) {
      await Promise.all([
        ctx.service.favortie.create({ favorite_id, article_id }),
        ctx.service.client.favoritePlusOne(article_id),
        ctx.service.login.favoritePlusOne(author),
      ]);
    } else {
      if (favortie.status === 2) {
        await Promise.all([
          ctx.service.favortie.update(favortie.id, 1),
          ctx.service.client.favoritePlusOne(article_id),
          ctx.service.login.favoritePlusOne(author),
        ]);
      }
      if (favortie.status === 1) {
        await Promise.all([
          ctx.service.favortie.update(favortie.id, 2),
          ctx.service.client.favoriteReduceOne(article_id),
          ctx.service.login.favoriteReduceOne(author),
        ]);
      }
    }
    ctx.body = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
  }

  // [前台] 判断博主是否点赞文章
  async isFavorite() {
    const { ctx } = this;
    const { user_id: favorite_id } = ctx.locals;
    const { id: article_id } = ctx.query;
    const favorite = await ctx.service.favortie.findOne(favorite_id, article_id, 1);
    ctx.body = {
      errcode: 0,
      data: favorite !== null,
      msg: 'success',
    };
  }
}

module.exports = BlogController;
