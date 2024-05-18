const redis = require("redis");
const config = require("../config/config");

class RedisConnection {
  constructor() {
    this.client = redis.createClient({
      socket: {
        host: config.redis.host,
        port: config.redis.port,
        connectTimeout: 10000,
      },
    });
  }

  async init() {
    await this.client.on("error", (err) =>
      console.log("Redis Client Error", err),
    );
    await this.client.connect();
    console.log("Connected to Redis");
  }

  async store(key, value) {
    await this.client.set(key, value, { EX: 60 * 60 * 1 });
  }

  async get(key) {
    const result = await this.client.get(key);
    return JSON.parse(result);
  }

  async delete(key) {
    await this.client.del(key);
  }
}

module.exports = new RedisConnection();
