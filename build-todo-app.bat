@echo off
echo.
echo ========================================
echo   Todo List App Installer Builder
echo ========================================
echo.

cd TODO_APP

echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    cd ..
    pause
    exit /b 1
)

echo.
echo Building Todo List App...
call npm run build-win
if errorlevel 1 (
    echo Error: Build failed
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Installers created in 'TODO_APP\dist' folder:
echo - Todo List App Setup 1.0.0.exe (Installer)
echo - Todo List App 1.0.0.exe (Portable)
echo.
echo Installation path: Program Files\Todo List App
echo.
pause
