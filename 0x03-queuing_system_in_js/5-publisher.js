import redis from 'redis';

const cl = redis.createClient();
cl.on('connect', function() {console.log('Redis client connected to the server');});
cl.on('error', function(err) {console.log('Redis client not connected to the server: ' + err);});
cl.subscribe('holberton school channel');
cl.on('message', function(channel, message) {
  console.log('Message received on channel ' + channel + ': ' + message);
  if (message === 'KILL_SERVER') {
    cl.unsubscribe();
    cl.quit();}});
