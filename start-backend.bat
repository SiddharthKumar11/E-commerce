@echo off
echo ========================================
echo Starting E-Commerce Backend Server
echo ========================================
echo.

cd apps\server

echo Checking environment...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please make sure .env exists in apps\server
    pause
    exit /b 1
)

echo Starting server...
echo Backend will run on: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

pause
