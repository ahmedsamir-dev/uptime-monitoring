import Redis from "ioredis";

export default class RedisConnection {
  private static client: Redis;

  public static connect() {
    this.client = new Redis();
  }

  public static getClient(): Redis {
    return this.client;
  }
}
