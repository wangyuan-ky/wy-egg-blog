/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Category = app.model.define('categories', {
    id: {
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '行ID',
    },
    name: {
      type: STRING(50),
      defaultValue: null,
      comment: '分类名称',
    },
    en_name: {
      type: STRING(50),
      defaultValue: null,
      comment: '分类英文名称',
    },
    status: {
      type: INTEGER,
      defaultValue: 1,
      comment: '分类状态：1->正常,2->删除',
    },
    create_time: {
      type: DATE,
      comment: '创建时间',
    },
    update_time: {
      type: DATE,
      comment: '更新时间',
    },
  });
  Category.associate = () => {
    app.model.Category.hasMany(app.model.Article, { as: 'article' });
    app.model.Category.hasMany(app.model.Tag, { as: 'tags' });
  };
  return Category;
};
