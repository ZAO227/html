# 后端 · 投标共享资料平台

Spring Boot 3 + MyBatis + MySQL。

建库脚本：`sql/schema.sql`、`sql/seed.sql`  
配置：`src/main/resources/application.yml`  
完整启动步骤见仓库根目录 [README.md](../README.md)。

```bash
# 推荐：本机 MySQL
mvn spring-boot:run

# 无 MySQL 时的演示模式（H2）
mvn spring-boot:run -Dspring-boot.run.profiles=demo
```
