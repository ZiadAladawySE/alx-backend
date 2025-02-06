import redis from 'redis';

const cl = redis.createClient();
cl.on('connect', () => {console.log('Redis client connected to the server');});
cl.on('error', (err) => {console.error(`Redis client not connected to the server: ${err}`);});
function setNewSchool(schoolName, value) {cl.set(schoolName, value, redis.print);}
function displaySchoolValue(schoolName) {cl.get(schoolName, (err, reply) => {console.log(reply);});}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
