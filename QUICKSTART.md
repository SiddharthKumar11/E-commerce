# Quick Start Guide

## Important: MongoDB & Redis Setup

The backend requires MongoDB and Redis to run. You have two options:

### Option 1: Without Docker (Simpler for testing)

You can run the backend without MongoDB/Redis initially by commenting out the database connections:

1. Open `apps\server\src\server.ts`
2. Comment out lines that connect to MongoDB and Redis (lines 11-12)
3. The server will start but database operations won't work

### Option 2: Install MongoDB & Redis Locally

**MongoDB:**
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Default connection: `mongodb://localhost:27017`

**Redis:**
1. Download from: https://github.com/tporadowski/redis/releases (Windows version)
2. Extract and run `redis-server.exe`
3. Default connection: `localhost:6379`

---

## Starting the Application

### Step 1: Start Backend Server

**Double-click:** `start-backend.bat`

Or run manually:
```bash
cd apps\server
"C:\Program Files\nodejs\npm.cmd" run dev
```

The backend should start on: **http://localhost:5000**

### Step 2: Start Frontend (in a new terminal)

**Double-click:** `start-frontend.bat`

Or run manually:
```bash
cd apps\client
"C:\Program Files\nodejs\npm.cmd" run dev
```

The frontend should start on: **http://localhost:3000**

---

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Or temporarily disable MongoDB connection in `apps\server\src\server.ts`

### "Cannot connect to Redis"
- Make sure Redis is running
- Or temporarily disable Redis connection in `apps\server\src\server.ts`

### "Port 5000 already in use"
- Change `PORT=5001` in `apps\server\.env`

### "Port 3000 already in use"
- The Vite dev server will automatically try port 3001

---

## Testing Without Database

To test the frontend without backend:

1. Start only the frontend: `start-frontend.bat`
2. The UI will load but API calls will fail (expected)
3. You can see the design and navigation

To run the full application, you need both backend and database running.
