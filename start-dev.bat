@echo off
echo Starting MongoDB and Redis...
docker-compose up -d

echo.
echo Starting backend server...
cd apps\server
start cmd /k ""C:\Program Files\nodejs\npm.cmd" run dev"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak

echo.
echo Starting frontend...
cd ..\client
start cmd /k ""C:\Program Files\nodejs\npm.cmd" run dev"

echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause
