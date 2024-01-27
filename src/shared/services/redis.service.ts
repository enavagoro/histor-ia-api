import Redis from 'ioredis';
import * as dotenv from 'dotenv'
dotenv.config()

let redisClient: null | Redis = null;

export const setKeyValue = async (key: string, value: string): Promise<void> => {  
    if(!redisClient){
        throw new Error('Redis client not connected yet');
    } 

    await redisClient.set(key, value);
};

export const getValueByKey = async (key: string): Promise<string | null> => {
    if(!redisClient){
        throw new Error('Redis client not connected yet')
    } 

    return await redisClient.get(key);
}

export const resetKey = async (key: string) => {
    if(!redisClient){
        throw new Error('Redis client not connected yet')
    } 

    return await redisClient.del(key)
}

export const connectToRedis = () => {
    const connectionString = process.env.REDIS_CONNECTION_STRING || 'redis://localhost:6379';
    const client = new Redis(connectionString, {
        maxRetriesPerRequest: 20,
    });
    redisClient = client;
//     redisClient.on('error', (error) => {
//         console.error('Redis connection error:', error);
//         // Implement your reconnection logic here
//     });
//     console.log('redis connected:', redisClient);
// }
}
