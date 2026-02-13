import Redis from 'ioredis';
import Logger from '../core/Logger';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT) || 6379;

const redisClient = new Redis({
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: null, // Required for BullMQ
});

redisClient.on('connect', () => {
    Logger.info('Redis Connected');
});

redisClient.on('error', (err) => {
    Logger.error(`Redis Error: ${err.message}`);
});

export default redisClient;
