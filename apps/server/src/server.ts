import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';
import redisClient from './config/redis';
import Logger from './core/Logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to Databases
        await connectDB();

        // Check Redis connection (optional, as ioredis handles reconnection)
        if (redisClient.status === 'ready') {
            Logger.info('Redis is ready');
        }

        const server = app.listen(PORT, () => {
            Logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });

        // Graceful Shutdown
        const shutdown = () => {
            Logger.info('SIGTERM signal received: closing HTTP server');
            server.close(() => {
                Logger.info('HTTP server closed');
                redisClient.quit();
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);

    } catch (error) {
        Logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
