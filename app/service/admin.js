/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class BlogService extends Service {
  // 根据 用户ID 获取文章列表
  async getArticleList(id, page, keyword, status) {
    const pageSize = '10';
    const where = {
      status,
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
      return item;
    });
    return {
      list: rows,
      count,
    };
  }

  // 根据文章id获取文章详情
  async getArticleDetailByArticleId(id) {
    const { ctx } = this;
    return await ctx.model.Article.find({ id }).populate([ 'tag_id', 'category_id' ]);
  }

  // 根据用户id获取分类列表，只返回所有分类，用于文章编辑页
  async getCategoryListById(id) {
    const { ctx } = this;
    return await ctx.model.Category.find({ user_id: id }, { __v: 0, user_id: 0 });
  }

  // 根据用户id获取标签列表，只返回所有标签，用于文章编辑页
  async getTagsListById(id) {
    const { ctx } = this;
    return await ctx.model.Tag.find({ user_id: id }, { __v: 0, user_id: 0 });
  }

  // 更新文章
  async updateArticle(id) {
    const { ctx } = this;
    const [ oldArticle, res ] = await Promise.all([
      ctx.model.Article.findOne({ id }).select('status'),
      ctx.model.Article.update({ id }, {
        user_id: ctx.user_id,
        tag_id: ctx.request.body.tag,
        category_id: ctx.request.body.category || null,
        content: ctx.request.body.content,
        html: ctx.request.body.html,
        title: ctx.request.body.title,
        updated_at: Date(),
        status: ctx.request.body.status,
      }),
    ]);
    if (res.n > 0) {
      return {
        data: res,
        oldStatus: oldArticle.status,
      };
    }
  }

  // 创建文章
  async createArticle() {
    const { ctx } = this;
    return await ctx.model.Article.create({
      user_id: ctx.user_id,
      tag_id: ctx.request.body.tag,
      category_id: ctx.request.body.category || null,
      content: ctx.request.body.content,
      html: ctx.request.body.html,
      title: ctx.request.body.title,
      created_at: Date(),
      status: ctx.request.body.status,
    });
  }

  // 根据文章id删除文章
  async delArticleById(id) {
    const { ctx } = this;
    if (ctx.request.body.truly) {
      // 如果truly为真，则真正删除该文章，否则改变文章的status，加入垃圾箱
      return await ctx.model.Article.remove({ id });
    }
    return await ctx.model.Article.update({ id }, { status: 2 });
  }

  // 根据文章id的数组批量删除文章
  async delArticleBatch(list) {
    const { ctx } = this;
    if (ctx.request.body.truly) {
      // 如果truly为真，则真正删除该文章，否则改变文章的status，加入垃圾箱
      return await ctx.model.Article.remove({ id: { $in: list } });
    }
    return await ctx.model.Article.update({ id: { $in: list } }, { status: 2 }, { multi: true });
  }

  // 根据文章id恢复文章至垃圾箱文章
  async recoveryArticleById(id) {
    const { ctx } = this;
    return await ctx.model.Article.update({ id }, { status: 1 });
  }

  // 根据文章id的数组批量恢复文章至垃圾箱文章
  async recoveryArticleBatch(list) {
    const { ctx } = this;
    return await ctx.model.Article.update({ id: { $in: list } }, { status: 1 }, { multi: true });
  }

  // 分类列表页获取分类列表，包括数量
  async getCategoryList(id, page) {
    const pageSize = '10';
    const where = {
      status: 1,
    };
    const { ctx } = this;

    const { count, rows } = await ctx.model.Category.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
      include: [
        {
          model: this.ctx.model.Tag,
          as: 'tags',
        },
      ],
    });
    return {
      list: rows,
      count,
    };
  }

  // 修改分类信息
  async modifyCategory(category) {
    const { id, name } = category;
    const { ctx } = this;
    return await ctx.model.Category.update(
      {
        name,
      },
      {
        where: { id },
      }
    );
  }

  // 删除分类信息
  async delCategory(id) {
    const { ctx } = this;
    return await ctx.model.Category.update(
      {
        status: 2, // 假删，状态由 1 变成 2
      },
      {
        where: { id },
      }
    );
  }

  // 批量删除分类信息
  async delCategoryBatch(list) {
    const { ctx } = this;
    return await ctx.model.Category.update(
      {
        status: 2, // 假删，状态由 1 变成 2
      },
      {
        where: { id: list },
      }
    );
  }

  // 检查重复分类
  async checkDuplicateCategory(name) {
    const { ctx } = this;
    return await ctx.model.Category.findOne({
      where: {
        name,
        status: 1,
      },
    });
  }

  // 创建分类
  async createCategory(name) {
    const { ctx } = this;
    return await ctx.model.Category.create({
      name,
      en_name: '英文名，后期扩展',
      status: 1, // 正常状态
    });
  }

  // 标签列表页获取标签列表，包括数量
  async getTagList(page) {
    const pageSize = '10';
    const where = {
      status: 1,
    };
    const { ctx } = this;

    const { count, rows } = await ctx.model.Tag.findAndCountAll({
      where,
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [[ 'createdAt', 'DESC' ]], // 创建时间，倒序
      include: [{
        model: ctx.model.Category,
        as: 'category',
      }],
    });
    return {
      list: rows,
      count,
    };
  }

  // 修改标签
  async modifyTag({ id, name }) {
    const { ctx } = this;
    return await ctx.model.Tag.update({ id }, { name });
  }

  // 删除标签
  async delTag(id) {
    const { ctx } = this;
    return await ctx.model.Tag.remove({ id });
  }

  // 批量删除标签
  async delTagBatch(list) {
    const { ctx } = this;
    return await ctx.model.Tag.remove({ id: { $in: list } });
  }

  // 检查重复标签
  async checkDuplicateTag(name) {
    const { ctx } = this;
    const res = await ctx.model.Tag.find({ name });
    return res.length === 0;
  }

  // 创建标签
  async createTag(name) {
    const { ctx } = this;
    return await ctx.model.Tag.create({ name, user_id: ctx.user_id });
  }

  // 生成七牛token
  async getQiniuToken() {
    const { app } = this;
    // 这里需要七牛的Access Key和Secret Key
    const mac = new qiniu.auth.digest.Mac(app.config.qiniu.ak, app.config.qiniu.sk);
    const options = {
      scope: 'blog',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }

}

module.exports = BlogService;
