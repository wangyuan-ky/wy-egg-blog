/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';
const Service = require('egg').Service;

class FavoriteService extends Service {
  async update(id, status) {
    return this.ctx.model.Favorite.update({ status }, { where: { id } });
  }
  async create(params) {
    return this.ctx.model.Favorite.create(params);
  }
  async findOne(favorite_id, article_id, status = null) {
    const where = { favorite_id, article_id };
    if (status) where.status = status;
    return this.ctx.model.Favorite.findOne({ where });
  }
}

module.exports = FavoriteService;
