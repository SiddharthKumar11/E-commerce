@echo off
echo ========================================
echo Starting E-Commerce Frontend
echo ========================================
echo.

cd apps\client

echo Starting Vite dev server...
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

pause
