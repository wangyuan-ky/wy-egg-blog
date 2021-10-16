## wy-egg-blog

### 报错
解决：
 1. launchctl limit
 2. sudo launchctl limit maxfiles 524288 524288
### 目录结构

```
│  .autod.conf.js
│  .eslintignore
│  .eslintrc
│  .gitignore
│  .travis.yml
│  app.js // 项目启动前执行，比如写入管理员
│  appveyor.yml
│  package.json
│  README.md
│
├─app
│  │  router.js // 服务端路由
│  │
│  ├─controller
│  │      admin.js // 后台相关controller
│  │      client.js // 前台相关controller
│  │      login.js // 登录相关controller
│  │      page.js // 页面相关controller
│  │
│  ├─extend
│  │      helper.js
│  │
│  ├─middleware
│  │      auth.js // 登录验证中间件
│  │
│  ├─model
│  │      Article.js // 文章model
│  │      Category.js // 分类model
│  │      Tag.js // 标签model
│  │      User.js // 用户model
│  │
│  ├─public
│  │  │
│  │  ├─admin // admin端
│  │  │  ├─dist // 打包生成后的目录
│  │  │  └─src // admin端源文件
│  │  │
│  │  └─client // 用户端
│  │      ├─dist // 打包生成后的目录
│  │      └─src // 用户端源文件
│  │
│  └─service // service部分用来执行具体的操作
│          admin.js
│          client.js
│          login.js
│
├─config
│      config.default.js // 项目配置相关
│      plugin.js
│
└─test // 测试相关
    └─app
        └─controller
                home.test.js
```  

### 本地运行

``` bash
# 安装服务端依赖
npm install

# 运行服务
npm run dev
```

#### 创建数据表
该项目使用[Sequelize](https://sequelize.org/v5/)来操作数据库。使用`sequelize-cli`做数据库的迁移，非常方便，只需要我们提前定义好运行文件，需要的时候就可以直接操作并映射到数据库。如果你对`sequelize-cli`还不太了解可以参考官方文档[migrations](https://sequelize.org/v5/manual/migrations.html)。由于我提前把一些常用的命令写到了`package.json`文件中的`scripts`中,操作起来就更加方便了，只要执行

```bash
npm run migrate
```
对应的数据表就创建好了。

#### 初始化数据（可选）
为了方便测试，再创建数据表后，可以运行如下命令后添加一些初始化的数据，其中会自动创建2个测试账户，2篇文章，和一些分类、标签。这一步是可选的，如果你不需要初始化数据，可以选择不运行它。

```bash
npm run seed
```

```bash
# 进入前台目录
cd ./app/public/client/src

# 安装前台依赖
npm install

# 运行前台项目
npm run dev

# 进入后台目录
cd ./app/public/admin/src

# 安装后台依赖
npm install

# 运行后台项目
npm run dev

# 即可通过 http://127.0.0.1:8080访问
# 开发阶段直接通过 webpack 的 devserver 访问
# 代理请求已经配置好，可在 config 下配置 proxyTable 更改
```

### 打包

```bash
# 在前台和后台目录分别
npm run build

# 在项目根目录
npm install --production

# 启动
npm start

# 打包后可以通过
# http://127.0.0.1:7001/  和 http://127.0.0.1:7001/admin 来访问前台和后台
```


 
