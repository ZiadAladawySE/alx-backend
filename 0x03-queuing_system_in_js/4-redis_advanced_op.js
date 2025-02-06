import redis from 'redis';

const cl = redis.createClient();
cl.hset("HolbertonSchools", "Portland", 50, redis.print);
cl.hset("HolbertonSchools", "Seattle", 80, redis.print);
cl.hset("HolbertonSchools", "New York", 20, redis.print);
cl.hset("HolbertonSchools", "Bogota", 20, redis.print);
cl.hset("HolbertonSchools", "Cali", 40, redis.print);
cl.hset("HolbertonSchools", "Paris", 2, redis.print);
cl.hgetall("HolbertonSchools", function(err, reply) {console.log(reply);});
