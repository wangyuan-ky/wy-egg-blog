/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;
  const Favorite = app.model.define('favorites', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '行ID',
    },
    article_id: {
      type: INTEGER,
      allowNull: false,
      comment: '文章ID',
    },
    favorite_id: {
      type: INTEGER,
      allowNull: false,
      comment: '点赞ID',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '点赞状态：1->正常,2->删除',
    },
    created_at: {
      type: DATE,
      comment: '创建时间',
    },
    updated_at: {
      type: DATE,
      comment: '更新时间',
    },
  });
  Favorite.associate = () => {
    app.model.Favorite.belongsTo(app.model.Article, { as: 'article' });
  };
  return Favorite;
};
