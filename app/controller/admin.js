/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

const Controller = require('egg').Controller;
class BlogController extends Controller {

  // 获取所有文章列表
  async getArticleList() {
    const { ctx } = this;
    const { page = 1, keyword = '', status = 0 } = ctx.query;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleList = await ctx.service.admin.getArticleList(ctx.user_id, page, keyword, status);
    resMsg.data = {
      list: articleList.list,
      count: articleList.count,
    };
    ctx.body = resMsg;
  }

  // 获取文章的内容
  async getArticleDetail() {
    const { ctx } = this;
    const article_id = ctx.request.body.id;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const articleDetail = await ctx.service.admin.getArticleDetailByArticleId(article_id);
    resMsg.data = articleDetail[0];
    ctx.body = resMsg;
  }

  // 编辑文章页获取用户的标签和分类数据
  async getArticleOptions() {
    const { ctx } = this;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const categoryListPromise = ctx.service.admin.getCategoryListById(ctx.user_id);
    const tagsListPromise = ctx.service.admin.getTagsListById(ctx.user_id);
    const categoryList = await categoryListPromise;
    const tagsList = await tagsListPromise;
    resMsg.data = {
      categoryList,
      tagsList,
    };
    ctx.body = resMsg;
  }

  // 创建或更新文章，如果有文章id就更新文章，否则新建文章
  async postArticle() {
    const { ctx } = this;
    const { title, content } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    if (!title || !content) {
      resMsg.errcode = 1;
      resMsg.msg = '请完整填写文章信息';
      ctx.body = resMsg;
      return;
    }
    // 如果有文章id就更新文章，否则新建文章
    if (ctx.request.body.id) {
      const res = await ctx.service.admin.updateArticle(ctx.request.body.id);
      resMsg.data.id = res.data.id;
      resMsg.msg = '文章修改成功';
      if (res.oldStatus !== ctx.request.body.status) {
        resMsg.msg = '文章发布成功';
      }
    } else {
      const res = await ctx.service.admin.createArticle();
      resMsg.data.id = res.id;
      resMsg.msg = '文章发布成功';
      if (res.status === 1) {
        resMsg.msg = '文章已存入草稿箱';
      }
    }
    ctx.body = resMsg;
  }

  // 删除文章
  async delArticle() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const res = await ctx.service.admin.delArticleById(id);
    if (res.n > 0) {
      resMsg.msg = '文章删除成功';
    } else {
      resMsg.msg = '文章删除失败';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 批量删除文章
  async delArticleBatch() {
    const { ctx } = this;
    const { list } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const res = await ctx.service.admin.delArticleBatch(list);
    if (res.n > 0) {
      resMsg.msg = '文章删除成功';
    } else {
      resMsg.msg = '文章删除失败';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 恢复文章
  async recoveryArticle() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const res = await ctx.service.admin.recoveryArticleById(id);
    if (res.n > 0) {
      resMsg.msg = '文章恢复成功';
    } else {
      resMsg.msg = '文章恢复失败';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 批量恢复文章
  async recoveryArticleBatch() {
    const { ctx } = this;
    const { list } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const res = await ctx.service.admin.recoveryArticleBatch(list);
    if (res.n > 0) {
      resMsg.msg = '文章恢复成功';
    } else {
      resMsg.msg = '文章恢复失败';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 分类列表页获取分类列表
  async getCategoryList() {
    const { ctx } = this;
    const id = ctx.user_id;
    const page = ctx.query.page;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const res = await ctx.service.admin.getCategoryList(id, page);
    resMsg.data = res;
    ctx.body = resMsg;
  }

  // 修改分类信息
  async modifyCategory() {
    const { ctx } = this;
    const { category } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '分类修改成功',
    };
    const [ count ] = await ctx.service.admin.modifyCategory(category);
    if (+count <= 0) {
      resMsg.msg = '该分类id不存在';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 删除分类信息
  async delCategory() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '分类删除成功',
    };
    let res;
    if (id instanceof Array) {
      res = await ctx.service.admin.delCategoryBatch(id);
    } else if (typeof id === 'string' || typeof id === 'number') {
      res = await ctx.service.admin.delCategory(id);
    } else {
      resMsg.msg = '参数类型应为数组、数字或者字符串';
      resMsg.errcode = 1;
      ctx.body = resMsg;
      return;
    }

    if (res && +res[0] <= 0) {
      resMsg.msg = '分类id不存在';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 创建分类
  async createCategory() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '分类新增成功',
    };
    const categoryInfo = await ctx.service.admin.checkDuplicateCategory(name);
    if (categoryInfo && categoryInfo.id) {
      resMsg.msg = '该分类已存在';
      resMsg.errcode = 1;
    } else {
      const newCategory = await ctx.service.admin.createCategory(name);
      if (!newCategory.id) {
        resMsg.msg = '分类新增失败';
      }
    }
    ctx.body = resMsg;
  }

  // 获取标签列表
  async getTagList() {
    const { ctx } = this;
    const page = ctx.query.page;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: 'success',
    };
    const res = await ctx.service.admin.getTagList(page);
    resMsg.data = res;
    ctx.body = resMsg;
  }

  // 修改标签信息
  async modifyTag() {
    const { ctx } = this;
    const { tag } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '标签修改成功',
    };
    const [ count ] = await ctx.service.admin.modifyTag(tag);
    if (+count <= 0) {
      resMsg.msg = '该标签id不存在';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 删除标签，如果提交一个id字符串，删除该标签；如果提交一个标签的数组，则删除该数组匹配的所有标签
  async delTag() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '标签删除成功',
    };
    let res;
    if (id instanceof Array) {
      res = await ctx.service.admin.delTagBatch(id);
    } else if (typeof id === 'string' || typeof id === 'number') {
      res = await ctx.service.admin.delTag(id);
    } else {
      resMsg.msg = '参数类型应为数组、数字或者字符串';
      resMsg.errcode = 1;
      ctx.body = resMsg;
      return;
    }
    if (res && +res[0] <= 0) {
      resMsg.msg = '标签id不存在';
      resMsg.errcode = 1;
    }
    ctx.body = resMsg;
  }

  // 创建标签
  async createTag() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '标签新增成功',
    };
    const tagInfo = await ctx.service.admin.checkDuplicateTag(name);
    if (tagInfo && tagInfo.id) {
      resMsg.msg = '该标签已存在';
      resMsg.errcode = 1;
    } else {
      const newTag = await ctx.service.admin.createTag(name);
      if (!newTag.id) {
        resMsg.msg = '标签新增失败';
      }
    }
    ctx.body = resMsg;
  }

  // 获取七牛token
  async getQiniuToken() {
    const { ctx } = this;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '获取token成功',
    };
    resMsg.data.token = await ctx.service.admin.getQiniuToken();
    ctx.body = resMsg;
  }

}

module.exports = BlogController;
