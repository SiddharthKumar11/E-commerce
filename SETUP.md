# Installation & Setup Guide

## Prerequisites

You mentioned you've downloaded Node.js. To use it, you need to add it to your system PATH.

### Option 1: Add Node.js to PATH (Recommended)

1. **Find your Node.js installation directory** (common locations):
   - `C:\Program Files\nodejs`
   - `C:\Program Files (x86)\nodejs`
   - Check your Downloads folder for the installer

2. **Add to PATH**:
   - Press `Win + X` and select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and select "Path"
   - Click "Edit" → "New"
   - Add your Node.js installation path (e.g., `C:\Program Files\nodejs`)
   - Click "OK" on all dialogs
   - **Restart your terminal/PowerShell**

3. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

### Option 2: Use Full Path (Temporary)

If you know where Node.js is installed, you can use the full path:

```bash
# Example (adjust path to your installation):
"C:\Program Files\nodejs\npm.exe" install
```

---

## Installation Steps

Once Node.js is in your PATH:

### 1. Install Root Dependencies
```bash
cd "c:\Users\INFINIX\Desktop\Web Dev\E-commerce"
npm install
```

### 2. Install Server Dependencies
```bash
cd apps\server
npm install
```

### 3. Install Client Dependencies
```bash
cd ..\client
npm install
```

---

## Running the Project

### 1. Start MongoDB and Redis
```bash
# From project root
docker-compose up -d
```

**Note**: If you don't have Docker installed, you can:
- Install MongoDB from: https://www.mongodb.com/try/download/community
- Install Redis from: https://github.com/microsoftarchive/redis/releases

### 2. Start the Backend Server
```bash
# From project root
npm run dev:server
```

Or from `apps/server`:
```bash
cd apps\server
npm run dev
```

The backend will run on: **http://localhost:5000**

### 3. Start the Frontend (in a new terminal)
```bash
# From apps/client
cd apps\client
npm run dev
```

The frontend will run on: **http://localhost:3000**

---

## Troubleshooting

### "npm is not recognized"
- Make sure Node.js is added to your PATH
- Restart your terminal after adding to PATH
- Try using the full path to npm.exe

### "Cannot connect to MongoDB"
- Make sure Docker is running: `docker ps`
- Or start MongoDB manually if installed locally

### "Cannot connect to Redis"
- Make sure Docker is running
- Or start Redis manually if installed locally

### Port already in use
- Backend (5000): Change `PORT` in `apps/server/.env`
- Frontend (3000): Change port in `apps/client/vite.config.ts`

---

## Quick Start (After Setup)

```bash
# Terminal 1: Start databases
docker-compose up -d

# Terminal 2: Start backend
cd apps\server
npm run dev

# Terminal 3: Start frontend
cd apps\client
npm run dev
```

Visit **http://localhost:3000** to see your app!
