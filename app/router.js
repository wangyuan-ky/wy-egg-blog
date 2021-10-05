/*
 * @Author: 王媛
 * @Last Modified by: 王媛
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 后台授权中间件
  const auth = app.middleware.auth();

  // [后台] 首页
  router.get('/', controller.page.index);
  router.get('/admin', controller.page.admin);

  // [后台] 获取验证码
  router.get('/getCaptcha', controller.login.getCaptcha);

  // [后台] 登录
  router.post('/login', controller.login.login);

  // [后台] 获取所有文章列表
  router.get('/getArticleList', auth, controller.admin.getArticleList);

  // [后台] 编辑文章页获取用户的标签和分类数据
  router.get('/getArticleOptions', auth, controller.admin.getArticleOptions);

  // [后台] 获取文章的内容
  router.post('/getArticleDetail', auth, controller.admin.getArticleDetail);

  // [后台] 创建或更新文章，如果有文章id就更新文章，否则新建文章
  router.post('/postArticle', auth, controller.admin.postArticle);

  // [后台] 删除文章
  router.post('/delArticle', auth, controller.admin.delArticle);

  // [后台] 批量删除文章
  router.post('/delArticleBatch', auth, controller.admin.delArticleBatch);

  // [后台] 恢复文章
  router.post('/recoveryArticle', auth, controller.admin.recoveryArticle);

  // [后台] 批量恢复文章
  router.post('/recoveryArticleBatch', auth, controller.admin.recoveryArticleBatch);

  // [后台] 获取分类列表
  router.get('/getCategoryList', auth, controller.admin.getCategoryList);

  // [后台] 修改分类信息
  router.post('/modifyCategory', auth, controller.admin.modifyCategory);

  // [后台] 删除分类，如果提交一个id字符串，删除该分类；如果提交一个分类的数组，则删除该数组匹配的所有分类
  router.post('/delCategory', auth, controller.admin.delCategory);

  // [后台] 创建分类
  router.post('/createCategory', auth, controller.admin.createCategory);

  // [后台] 获取标签列表
  router.get('/getTagList', auth, controller.admin.getTagList);

  // [后台] 修改标签信息
  router.post('/modifyTag', auth, controller.admin.modifyTag);

  // [后台] 删除标签，如果提交一个id字符串，删除该标签；如果提交一个标签的数组，则删除该数组匹配的所有标签
  router.post('/delTag', auth, controller.admin.delTag);

  // [后台] 创建标签
  router.post('/createTag', auth, controller.admin.createTag);

  // [后台] 获取七牛token
  router.get('/getQiniuToken', auth, controller.admin.getQiniuToken);

  /** 前台路由 */
  // [前台] 获取所有文章列表，如果有传keyword,则根据keyword搜索
  router.get('/c/getArticleList', controller.client.getArticleList);

  // [前台] 根据分类搜索
  router.get('/c/searchByCategory', controller.client.searchByCategory);

  // [前台] 根据标签搜索
  router.get('/c/searchByTag', controller.client.searchByTag);

  // [前台] 获取文章的详细信息
  router.post('/c/getArticleDetail', controller.client.getArticleDetail);

  // [前台] 获取所有分类和标签及其数量
  router.get('/c/getTagsAndCategories', controller.client.getTagsAndCategories);

  router.get('/c/hot', controller.client.hot); // [前台] 获取热门文章

  router.post('/delete/comment', controller.admin.deleteComment); // [后台] 删除文章

  router.get('/comments', controller.admin.comments); // [后台] 获取文章评论列表
  router.get('/c/comments', controller.client.comments); // [前台] 获取文章评论列表

  router.post('/c/toursit/comment', controller.client.toursitComment); // [前台] 游客进行评论

  router.post('/c/create/comment', controller.client.createComment); // [前台] 博主进行评论

  router.post('/c/update/favorite', controller.client.updateFavorite); // [前台] 更新用户对文章的点赞状态

  router.get('/c/isFavorite', controller.client.isFavorite); // [前台] 判断博主是否点赞文章
};
