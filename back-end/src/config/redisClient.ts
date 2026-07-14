import { createClient, RedisClientType } from 'redis';

// Initialize the client
const redisClient: RedisClientType = createClient({
  url: 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect function
export async function connectRedis(): Promise<void> {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Redis connected successfully!');
  }
}

export { redisClient };
