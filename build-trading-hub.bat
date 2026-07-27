@echo off
echo.
echo ========================================
echo   Smart Trading Hub Installer Builder
echo ========================================
echo.

echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Building Smart Trading Hub...
call npm run build-win
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Installers created in 'dist' folder:
echo - Smart Trading Hub Setup 1.0.0.exe (Installer)
echo - Smart Trading Hub 1.0.0.exe (Portable)
echo.
echo Installation path: Program Files\Smart Trading Hub
echo.
pause
