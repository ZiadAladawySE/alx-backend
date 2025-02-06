import redis from 'redis';
import { promisify } from 'util';

const cl = redis.createClient();
cl.on('connect', () => {console.log('Redis client connected to the server');});
cl.on('error', (err) => {console.log(`Redis client not connected to the server: ${err}`);});
cl.subscribe('holberton school channel');
cl.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();}});
async function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    cl.publish('holberton school channel', message);}, time);}
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
