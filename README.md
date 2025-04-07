# WJ自制女装品牌店后台管理系统

## 项目概述

本项目是WJ自制女装品牌店的后台管理系统，基于Vue3 + TypeScript开发。系统主要用于管理线上商城的各项业务功能，包括商品管理、订单管理、用户管理等核心功能。

## 技术栈

- 前端框架：Vue 3
- 开发语言：TypeScript
- 路由管理：Vue Router
- 状态管理：Vuex/Pinia
- UI组件库：Element Plus
- 构建工具：Vite
- HTTP客户端：使用的是静态数据

## 功能模块

### 1. 用户管理
- 管理员登录/注册系统
- 用户账号管理
- 用户权限控制
- 用户数据统计

### 2. 商品管理
- 商品分类管理
  - 上衣
  - 裤子
  - 套装
  - 外套
  - 短裤
  - 长裤
  - 牛仔
- 商品上架/下架
- 商品信息编辑
  - 商品名称
  - 商品价格
  - 商品图片
  - 商品描述
  - 商品库存
- 商品排序管理
  - 上架时间
  - 好评率
  - 价格
  - 销量

### 3. 订单管理
- 订单状态跟踪
- 订单详情查看
- 订单统计分析
- 发货管理

### 4. 营销管理
- 优惠券管理
  - 满减优惠
  - 折扣优惠
  - 新人优惠
- 活动管理
  - 限时优惠
  - 新品上线
  - 热销榜单

### 5. 数据统计
- 销量统计
- 评价管理
- 用户反馈
- 销售报表

## 文件目录结构

```
src/
├── assets/           # 静态资源文件
│   ├── images/      # 图片资源
│   ├── styles/      # 全局样式
│   └── icons/       # 图标资源
├── components/       # 公共组件
│   ├── Header/      # 头部组件
│   ├── Sidebar/     # 侧边栏组件
│   └── common/      # 其他公共组件
├── views/           # 页面视图组件
│   ├── login/       # 登录页
│   ├── dashboard/   # 控制台
│   ├── goods/       # 商品管理
│   ├── orders/      # 订单管理
│   └── users/       # 用户管理
├── router/          # 路由配置
├── store/           # 状态管理
├── utils/           # 工具函数
├── api/             # API接口
└── types/           # TypeScript类型定义
```

## 项目规范

### 1. 命名规范
- 组件名：PascalCase
- 文件名：kebab-case
- 变量名：camelCase
- 常量名：UPPERCASE_SNAKE_CASE

### 2. 样式规范
- 使用CSS预处理器SCSS
- 采用BEM命名规范
- 公共样式统一管理
- 组件样式模块化

### 3. 代码规范
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 遵循TypeScript规范
- 注重代码可读性和可维护性

## 开发指南

### 1. 环境准备
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 2. 配置说明
- 开发环境：.env.development
- 生产环境：.env.production
- 测试环境：.env.test

### 3. 注意事项
- 所有API请求需要进行错误处理
- 注重用户数据安全
- 保持代码提交信息规范
- 做好版本控制

## 原型项目参考

基于原有商城项目(wjshopP)的功能模块：

1. 用户系统
   - 登录/注册功能
   - 用户信息管理

2. 商品展示
   - 首页轮播
   - 商品分类
   - 商品列表
   - 价格展示

3. 购物功能
   - 购物车管理
   - 订单处理
   - 优惠券系统

4. 数据管理
   - 销量统计
   - 用户评价
   - 商品库存

## 项目进度规划

1. 第一阶段：基础框架搭建
   - 项目初始化
   - 路由配置
   - 状态管理
   - 公共组件

2. 第二阶段：核心功能开发
   - 用户管理模块
   - 商品管理模块
   - 订单管理模块

3. 第三阶段：扩展功能开发
   - 数据统计模块
   - 营销管理模块
   - 系统设置模块

4. 第四阶段：测试与优化
   - 单元测试
   - 性能优化
   - 文档完善
