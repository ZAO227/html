@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0backend"

echo [投标共享资料平台] 启动后端（演示模式 H2，无需 MySQL）...
echo.

where mvn >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 mvn，请先安装 Maven 并加入 PATH。
  pause
  exit /b 1
)

mvn spring-boot:run -Dspring-boot.run.profiles=demo
pause
