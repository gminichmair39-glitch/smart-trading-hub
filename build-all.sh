#!/bin/bash

echo ""
echo "========================================"
echo "  Building Smart Trading Hub & Todo App"
echo "========================================"
echo ""

echo "[1/4] Installing Smart Trading Hub dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies"
    exit 1
fi

echo ""
echo "[2/4] Building Smart Trading Hub..."
npm run build-win
if [ $? -ne 0 ]; then
    echo "Failed to build Smart Trading Hub"
    exit 1
fi

echo ""
echo "[3/4] Installing Todo List App dependencies..."
cd TODO_APP
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install Todo dependencies"
    cd ..
    exit 1
fi

echo ""
echo "[4/4] Building Todo List App..."
npm run build-win
if [ $? -ne 0 ]; then
    echo "Failed to build Todo App"
    cd ..
    exit 1
fi

cd ..

echo ""
echo "========================================"
echo "  Build Complete!"
echo "========================================"
echo ""
echo "Smart Trading Hub installer: dist/Smart Trading Hub Setup 1.0.0.exe"
echo "Todo List App installer: TODO_APP/dist/Todo List App Setup 1.0.0.exe"
echo ""
