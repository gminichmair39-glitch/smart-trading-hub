@echo off
echo.
echo ========================================
echo   Building Smart Trading Hub & Todo App
echo ========================================
echo.

echo [1/4] Installing Smart Trading Hub dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building Smart Trading Hub...
call npm run build-win
if errorlevel 1 (
    echo Failed to build Smart Trading Hub
    pause
    exit /b 1
)

echo.
echo [3/4] Installing Todo List App dependencies...
cd TODO_APP
call npm install
if errorlevel 1 (
    echo Failed to install Todo dependencies
    cd ..
    pause
    exit /b 1
)

echo.
echo [4/4] Building Todo List App...
call npm run build-win
if errorlevel 1 (
    echo Failed to build Todo App
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
echo Smart Trading Hub installer: dist/Smart Trading Hub Setup 1.0.0.exe
echo Todo List App installer: TODO_APP/dist/Todo List App Setup 1.0.0.exe
echo.
pause
