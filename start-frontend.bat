@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0frontend"

echo [投标共享资料平台] 启动前端...
echo 浏览器访问: http://127.0.0.1:5173
echo 默认账号: zhangsan / 123456
echo.

where npm >nul 2>&1
if errorlevel 1 (
  echo [错误] 未找到 npm，请先安装 Node.js 并加入 PATH。
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo 首次运行，正在 npm install ...
  call npm install
  if errorlevel 1 (
    echo [错误] npm install 失败。
    pause
    exit /b 1
  )
)

call npm run dev
pause
