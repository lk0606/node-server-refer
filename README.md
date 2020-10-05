# router
> api下router统一管理

# 目录结构说明
> 之所以要拆分`controllers`和`services`，是因为不想`controllers`吃业务逻辑，单独拿出来让`services`去处理。
```bash
├── README.md
├── app
│   ├── api # 分版本处理
│   │   ├── v1
│   │   │   ├── books.js
│   │   │   └── user.js
│   │   └── v2
│   │       └── books.js
│   ├── config # 打包or配置文件
│   │   └── sequelize.js
│   ├── controllers
│   │   └── user.js
│   ├── core
│   │   └── init.js
│   ├── lib
│   │   └── sequelize.js
│   ├── middleware
│   │   └── exception.js
│   ├── models
│   │   └── user.js
│   └── services
│       └── user.js
├── app.js
├── docs
├── package.json
└── test.js
```