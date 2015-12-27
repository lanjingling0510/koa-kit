# koa-template
一个koajs的后台，包括qq第三方登录，微信第三方登录，token验证登录等

## 主要的依赖包括：

* koa-router
* koa-body
* koa-passport
* passport-jwt
* passport-local
* passport-wechat
* passport-qq2015
* mongoose



## 运行

    `npm install`
    `npm run start`

## 测试

    `npm run test`

## 项目结构
整个项目采用MVC架构，基本项目结构如下图
```asciidoc
koa-template/                  项目根目录
├── bin/                     此目录包含一些执行脚本，如启动应用，插入测试数据等
├── config.example.json 	 配置文件模板
├── config.json 	         配置文件
├── index.js			 	项目入口文件
├── models/  				数据库模型文件
├── chat		   基于socket.io的即时聊天服务器
├── package.json			 npm的声明文件，包含项目的依赖等
├── README.md				包含对此此项目的一些介绍，就是当前说看到的内容
├── test/  				  此目录包含所有测试文件，目前只做功能性测试
└── v1/   				   此目录包含所有路由文件
```
