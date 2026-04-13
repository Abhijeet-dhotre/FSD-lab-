@echo off
echo ========================================
echo Starting MongoDB Backend
echo ========================================
cd /d "%~dp0backend"
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo FAILED: npm install failed
    pause
    exit /b 1
)
echo.
echo Starting server...
call npm start
pause