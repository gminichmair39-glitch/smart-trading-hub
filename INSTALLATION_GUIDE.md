# Smart Trading Hub & Todo List App - Installation Guide

## Prerequisites

- Node.js v16 or higher: [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Git: [Download](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/gminichmair39-glitch/smart-trading-hub.git
cd smart-trading-hub
```

### 2. Choose Your App

You now have TWO applications available:

#### Option A: Smart Trading Hub (SQLite Database)

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for Windows
npm run build-win
```

The installer will be generated in the `dist/` folder.

#### Option B: Todo List App (Local Storage)

```bash
cd TODO_APP

# Install dependencies
npm install

# Start development mode
npm run dev

# Build for Windows
npm run build-win
```

The installer will be generated in the `dist/` folder.

## Running the Apps

### Development Mode

Both apps will run with:
```bash
npm run dev
```

This starts:
- React development server on `http://localhost:3000`
- Electron application window

### Production Build

#### Smart Trading Hub
```bash
npm run build-win
```

Creates:
- `dist/Smart Trading Hub Setup 1.0.0.exe` - Installer
- `dist/Smart Trading Hub 1.0.0.exe` - Portable executable

#### Todo List App
```bash
cd TODO_APP
npm run build-win
```

Creates:
- `dist/Todo List App Setup 1.0.0.exe` - Installer
- `dist/Todo List App 1.0.0.exe` - Portable executable

## Installation Package Contents

### Smart Trading Hub (Full build)
- Complete Electron application
- React UI
- SQLite database
- All dependencies bundled

### Todo List App (Full build)
- Complete Electron application
- React UI
- Local storage functionality
- All dependencies bundled

## Features by App

### Smart Trading Hub
- 📊 Trading Dashboard
- 📝 Trading Journal
- 🧮 Lot Size Calculator
- 📈 Compound Calculator
- 📋 Track Record
- 🎓 Academy
- 💾 SQLite Database

### Todo List App
- ✅ Create/Edit/Delete Tasks
- 🏷️ Priority Levels & Categories
- 📅 Due Dates
- 🔍 Filter & Sort
- 💾 Local Storage
- 📱 Responsive Design

## Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/
- Restart your terminal/command prompt

### "electron not found"
```bash
npm install
npm install electron --save-dev
```

### Build fails
```bash
# Clean and reinstall
rm -r node_modules
rm package-lock.json
npm install
npm run build-win
```

### Port 3000 already in use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

## System Requirements

- **OS:** Windows 7 or later
- **RAM:** 512 MB minimum (1 GB recommended)
- **Disk Space:** 200 MB for installation
- **Internet:** Required only for initial setup

## File Locations

After installation, files are stored at:

- **Smart Trading Hub Database:** `%APPDATA%/Smart Trading Hub/trading-hub.db`
- **Todo List App Data:** Browser localStorage

## Uninstallation

1. Open Windows Control Panel
2. Go to "Programs and Features"
3. Find "Smart Trading Hub" or "Todo List App"
4. Click "Uninstall"

Or run the uninstaller from:
- `Program Files/Smart Trading Hub/Uninstall.exe`
- `Program Files/Todo List App/Uninstall.exe`

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Open an issue on GitHub: https://github.com/gminichmair39-glitch/smart-trading-hub/issues

## Version Info

- Smart Trading Hub v1.0.0
- Todo List App v1.0.0
- Built with Electron 28 & React 18
