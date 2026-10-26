-- 投标共享资料平台 — 种子数据
-- 用法：在执行 schema.sql 之后：mysql -u root -p bid_platform < seed.sql

USE bid_platform;

INSERT INTO sys_user (username, password, display_name, department) VALUES
('zhangsan', '123456', '张三', '业务部'),
('lisi', '123456', '李四', '财务部'),
('wangwu', '123456', '王五', '人事行政部');

INSERT INTO material_item
  (name, project_name, department, category, requirement, status, library, file_url) VALUES
('武汉市公安局制服采购项目合同', '武汉市公安局制服采购', '业务部', '项目合同', '需盖鲜章扫描件', 'PENDING', 0, NULL),
('2024年度增值税专用发票汇总', '日常财务归档', '财务部', '发票', '按月份整理 PDF', 'PENDING', 0, NULL),
('某部队作训服项目业绩证明', '某部队作训服招标', '业务部', '项目业绩', '含中标通知书', 'UPLOADED', 1, '/files/demo-performance.pdf'),
('企业营业执照副本', '企业资质库', '人事行政部', '企业资质', '彩色扫描件', 'UPLOADED', 1, '/files/demo-license.pdf'),
('安全生产许可证', '企业资质库', '人事行政部', '企业资质', '在有效期内', 'PENDING', 0, NULL),
('银行开户许可证', '企业资质库', '财务部', '企业资质', '清晰复印件', 'UPLOADED', 1, '/files/demo-bank.pdf'),
('黄石市环卫工装采购合同', '黄石市环卫工装采购', '业务部', '项目合同', '双方盖章齐全', 'PENDING', 0, NULL),
('2025年社保缴纳证明', '人事行政归档', '人事行政部', '人事证明', '近三个月', 'PENDING', 0, NULL),
('宜昌市执法服装项目投标函', '宜昌市执法服装招标', '业务部', '投标文件', 'PDF 签字版', 'UPLOADED', 1, '/files/demo-bid.pdf'),
('近三年财务审计报告', '企业资质库', '财务部', '财务资料', '会计师事务所盖章', 'PENDING', 0, NULL),
('质量管理体系认证证书', '企业资质库', '人事行政部', '企业资质', 'ISO9001', 'UPLOADED', 1, '/files/demo-iso.pdf'),
('襄阳市交警制服补充协议', '襄阳市交警制服采购', '业务部', '项目合同', '补充条款扫描', 'PENDING', 0, NULL),
('员工花名册（脱敏）', '人事行政归档', '人事行政部', '人事证明', '在职人员', 'UPLOADED', 1, '/files/demo-roster.pdf'),
('项目现场照片资料包', '某部队作训服招标', '业务部', '项目业绩', '压缩包', 'PENDING', 0, NULL),
('税务完税证明', '日常财务归档', '财务部', '财务资料', '近一年', 'PENDING', 0, NULL),
('法人身份证复印件', '企业资质库', '人事行政部', '企业资质', '正反面', 'UPLOADED', 1, '/files/demo-id.pdf'),
('十堰市保安服采购中标通知书', '十堰市保安服采购', '业务部', '项目业绩', '原件扫描', 'UPLOADED', 1, '/files/demo-win.pdf'),
('办公场地租赁合同', '企业资质库', '人事行政部', '企业资质', '有效期内', 'PENDING', 0, NULL),
('银行资信证明', '企业资质库', '财务部', '财务资料', '开户行出具', 'PENDING', 0, NULL),
('荆州市校服项目技术规格书', '荆州市校服招标', '业务部', '投标文件', '盖章版', 'UPLOADED', 1, '/files/demo-spec.pdf');
