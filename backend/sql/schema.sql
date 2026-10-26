-- 投标共享资料平台 — 建表脚本
-- 用法：mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS bid_platform
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bid_platform;

DROP TABLE IF EXISTS material_file;
DROP TABLE IF EXISTS material_item;
DROP TABLE IF EXISTS sys_user;

CREATE TABLE sys_user (
  id            BIGINT PRIMARY KEY AUTO_INCREMENT,
  username      VARCHAR(64)  NOT NULL UNIQUE COMMENT '登录账号',
  password      VARCHAR(128) NOT NULL COMMENT '明文演示密码，生产请哈希',
  display_name  VARCHAR(64)  NOT NULL COMMENT '显示名',
  department    VARCHAR(64)  NOT NULL COMMENT '所属部门',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统用户';

CREATE TABLE material_item (
  id            BIGINT PRIMARY KEY AUTO_INCREMENT,
  name          VARCHAR(256) NOT NULL COMMENT '资料名称',
  project_name  VARCHAR(256) NOT NULL COMMENT '关联项目',
  department    VARCHAR(64)  NOT NULL COMMENT '所属部门',
  category      VARCHAR(64)  NOT NULL COMMENT '资料分类',
  requirement   VARCHAR(512) DEFAULT NULL COMMENT '要求说明',
  status        VARCHAR(32)  NOT NULL DEFAULT 'PENDING' COMMENT 'PENDING/UPLOADED',
  library       TINYINT(1)   NOT NULL DEFAULT 0 COMMENT '是否已入库资料库',
  file_url      VARCHAR(512) DEFAULT NULL COMMENT '已上传文件路径/URL',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dept (department),
  INDEX idx_status (status),
  INDEX idx_library (library),
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资料清单项';
