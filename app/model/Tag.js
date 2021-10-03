/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Tag = app.model.define('tags', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '行ID',
    },
    name: {
      type: STRING(50),
      defaultValue: null,
      comment: '标签名称',
    },
    enName: {
      type: STRING(50),
      defaultValue: null,
      comment: '标签英文名称',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      comment: '用户ID',
    },
    categoryId: {
      type: INTEGER,
      allowNull: false,
      comment: '分类ID',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '标签状态：1->正常,2->删除',
    },
    createTime: {
      type: DATE,
      comment: '创建时间',
    },
    updateTime: {
      type: DATE,
      comment: '更新时间',
    },
  });
  Tag.associate = () => {
    app.model.Tag.belongsTo(app.model.Category, { as: 'category' });
    app.model.Tag.hasMany(app.model.Article, { as: 'article' });
  };
  return Tag;
};
