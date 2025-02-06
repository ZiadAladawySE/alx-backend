import redis from 'redis';
import { promisify } from 'util';

const cl = redis.createClient();
cl.on('connect', () => {console.log('Redis client connected to the server');});
cl.on('error', (err) => {console.error(`Redis client not connected to the server: ${err}`);});
function setNewSchool(schoolName, value) {cl.set(schoolName, value, redis.print);}
async function displaySchoolValue(schoolName) {
  const getAsync = promisify(cl.get).bind(cl);
  const value = await getAsync(schoolName);
  console.log(value);}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
