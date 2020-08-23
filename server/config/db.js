const config = require('./config');
const redis = require('redis');
const client = redis.createClient(config.REDIS_URL || config.REDIS_PORT);

client.on('error', (err) => {
  console.log('Error ' + err);
});

client.on('connect', () => {
    console.log('Redis Database connected'+'\n');
});

client.on('end', () => {
    console.log('\nRedis client disconnected');
});

module.exports.setex = (key, value) => {
    return new Promise((resolve, reject) => {
        client.setex(key, config.CACHE_DURATION, value, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(result);
        });
    });
  }
  
module.exports.get = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(result);
        });
    });
}
  
module.exports.close = () => {
    return new Promise((resolve, reject) => {
        client.quit((error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(result);
        });
    });
}