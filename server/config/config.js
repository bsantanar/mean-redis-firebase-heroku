const config = {
    PORT: process.env.PORT || 8080,
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_URL: process.env.REDIS_URL || null,
    CACHE_DURATION: 120
  };
  
  module.exports = config;