# 投标共享资料平台

湖北云龙服饰有限公司 · 第一期脚手架（登录 / 首页 / 资料库）。

## 技术栈

| 端 | 技术 |
| --- | --- |
| 前端 | React + TypeScript + Vite + Ant Design |
| 后端 | Java 21 + Spring Boot 3 + MyBatis |
| 数据库 | MySQL 8（推荐）；无本机 MySQL 时可用 `demo` 配置（H2 内存库） |

## 目录

```
.
├── README.md
├── start-all.bat              # Windows：一键启动（MySQL 后端 + 前端）
├── start-all-demo.bat         # Windows：一键启动（H2 演示 + 前端）
├── start-backend.bat          # Windows：仅后端（MySQL）
├── start-backend-demo.bat     # Windows：仅后端（H2 演示）
├── start-frontend.bat         # Windows：仅前端
├── backend/
│   ├── pom.xml
│   ├── sql/
│   │   ├── schema.sql         # 建库建表
│   │   └── seed.sql           # 种子用户与资料假数据
│   └── src/main/
│       ├── java/com/yunlong/bid/
│       │   ├── BidPlatformApplication.java
│       │   ├── auth/          # Token 鉴权
│       │   ├── config/
│       │   ├── controller/    # 登录 / 首页 / 资料 API
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── mapper/
│       │   └── service/
│       └── resources/
│           ├── application.yml
│           ├── application-demo.yml
│           ├── demo/          # H2 建表与种子
│           └── mapper/
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── App.tsx
        ├── api/
        ├── auth/
        ├── layouts/
        ├── pages/             # Login / Home / Library
        └── styles.css
```

## Windows 一键启动（.bat）

需已安装 **JDK 21+**、**Maven**、**Node.js**，并加入 PATH。

| 脚本 | 说明 |
| --- | --- |
| `start-all-demo.bat` | **推荐先试**：无 MySQL，H2 + 前端双窗口启动 |
| `start-all.bat` | MySQL 后端 + 前端（需先建库） |
| `start-backend-demo.bat` | 仅后端演示模式 |
| `start-backend.bat` | 仅后端（MySQL） |
| `start-frontend.bat` | 仅前端（首次会自动 `npm install`） |

双击运行后访问：http://127.0.0.1:5173

## 一、准备 MySQL（推荐）

本机已安装并启动 MySQL 后执行：

```bash
mysql -u root -p < backend/sql/schema.sql
mysql -u root -p bid_platform < backend/sql/seed.sql
```

修改 `backend/src/main/resources/application.yml` 中的数据源账号密码：

```yaml
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/bid_platform?...
    username: root
    password: root   # 改成你的密码
```

> 不强制使用 Docker。若暂时没有 MySQL，可跳过本节，后端使用下方「演示模式」。

## 二、启动后端

```bash
cd backend
# 需本机已安装 Maven 与 JDK 21+
mvn spring-boot:run
```

**无 MySQL 的演示模式（H2）：**

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=demo
```

后端默认端口：`http://127.0.0.1:8080`

## 三、启动前端

```bash
cd frontend
npm install
npm run dev
```

浏览器打开：`http://127.0.0.1:5173`  
开发服务器已将 `/api` 代理到后端 `8080`。

## 默认账号

| 账号 | 密码 | 姓名 | 部门 |
| --- | --- | --- | --- |
| `zhangsan` | `123456` | 张三 | 业务部 |
| `lisi` | `123456` | 李四 | 财务部 |
| `wangwu` | `123456` | 王五 | 人事行政部 |

## 第一期功能

- 登录（简易 Token 会话）
- 首页：待上传统计、资料清单（搜索 / 部门 / 状态 / 分页 / 上传·查看）
- 资料库：已入库资料浏览

未包含：资料清单维护。
