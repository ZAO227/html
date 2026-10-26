@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo [投标共享资料平台] 一键启动（MySQL 后端 + 前端）
echo 请确认已建库并配置 application.yml。
echo 将打开两个窗口；关闭窗口即停止对应服务。
echo.

start "bid-backend" cmd /k "%~dp0start-backend.bat"
timeout /t 3 /nobreak >nul
start "bid-frontend" cmd /k "%~dp0start-frontend.bat"

echo 已启动。前端: http://127.0.0.1:5173  后端: http://127.0.0.1:8080
echo 默认账号: zhangsan / 123456
pause
