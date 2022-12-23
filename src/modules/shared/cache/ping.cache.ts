import RedisConnection from '@/connections/redis.connections'
import IPingResult from '@/shared/interfaces/ping.interface'

export const pushLatestPing = async (pingResult: IPingResult) => {
  const redis = RedisConnection.getClient()

  const result = await redis.rpush(`Ping:checkid#${pingResult.check._id}`, JSON.stringify(pingResult))
  console.log(result)
}
