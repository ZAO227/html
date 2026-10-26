@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0backend"

echo [投标共享资料平台] 启动后端（MySQL）...
echo 请先执行 backend\sql\schema.sql 与 seed.sql，并检查 application.yml 账号密码。
echo.

where mvn >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 mvn，请先安装 Maven 并加入 PATH。
  pause
  exit /b 1
)

mvn spring-boot:run
pause
