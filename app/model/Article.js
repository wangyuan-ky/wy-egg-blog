/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const Article = app.model.define('articles', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '行ID',
    },
    title: {
      type: STRING,
      defaultValue: null,
      comment: '文章标题',
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
      comment: '分类ID',
    },
    tag_id: {
      type: INTEGER,
      allowNull: false,
      comment: '标签ID',
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: '用户ID',
    },
    content: {
      type: TEXT,
      defaultValue: null,
      comment: '文本内容',
    },
    html: {
      type: TEXT,
      defaultValue: null,
      comment: 'HTML内容',
    },
    abstract: {
      type: STRING(500),
      defaultValue: null,
      comment: '简介',
    },
    cover: {
      type: STRING,
      defaultValue: null,
      comment: '封面图片',
    },
    markdown: {
      type: TEXT,
      defaultValue: null,
      comment: 'markdown内容',
    },
    anchor: {
      type: TEXT,
      defaultValue: null,
      comment: '作者',
    },
    article_count: {
      type: INTEGER,
      defaultValue: 0,
      comment: '字数',
    },
    favorite: {
      type: INTEGER,
      defaultValue: 0,
      comment: '点赞数',
    },
    view: {
      type: INTEGER,
      defaultValue: 0,
      comment: '查看数',
    },
    comment: {
      type: INTEGER,
      defaultValue: 0,
      comment: '评论数',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '1->已发表,2->草稿,3->已删除',
    },
    create_time: {
      type: String,
    },
    update_time: {
      type: String,
    },
  });
  Article.associate = () => {
    app.model.Article.belongsTo(app.model.Category, { as: 'category' });
    app.model.Article.hasMany(app.model.Comment, { as: 'comments' });
    app.model.Article.hasMany(app.model.Favorite);
    app.model.Article.belongsTo(app.model.Tag, { as: 'tag' });
    app.model.Article.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Article;
};
