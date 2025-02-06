import redis from 'redis';

const cl = redis.createClient();
cl.on('connect', () => {console.log('Redis client connected to the server');});
cl.on('error', (err) => {console.error(`Redis client not connected to the server: ${err}`);});
