@echo off
echo Installing root dependencies...
"C:\Program Files\nodejs\npm.cmd" install

echo.
echo Installing server dependencies...
cd apps\server
"C:\Program Files\nodejs\npm.cmd" install

echo.
echo Installing client dependencies...
cd ..\client
"C:\Program Files\nodejs\npm.cmd" install

echo.
echo Installation complete!
echo.
echo To run the project:
echo 1. Start MongoDB and Redis: docker-compose up -d
echo 2. Start backend: cd apps\server ^&^& npm run dev
echo 3. Start frontend: cd apps\client ^&^& npm run dev
pause
