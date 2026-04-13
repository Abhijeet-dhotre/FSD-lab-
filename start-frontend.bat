@echo off
echo ========================================
echo Starting React Frontend
echo ========================================
cd /d "%~dp0frontend\student management system"
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo FAILED: npm install failed
    pause
    exit /b 1
)
echo.
echo Starting frontend...
call npm start
pause