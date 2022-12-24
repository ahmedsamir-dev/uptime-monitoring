import RedisConnection from '@/connections/redis.connections'
import { ICheckSchema } from '@/modules/check/check.interfaces'
import { IPingResult, IGetPingList } from '@/shared/interfaces/ping.interface'

export const pushLatestPing = async (pingResult: IPingResult) => {
  const redis = RedisConnection.getClient()

  const result = await redis.rpush(`Ping:checkid#${pingResult.check._id}`, JSON.stringify(pingResult))
}

export const getPingList = async (checkId: string): Promise<IGetPingList> => {
  const redis = RedisConnection.getClient()

  const redisResult = await redis.lrange(`Ping:checkid#${checkId}`, 0, -1)

  const pingList: Array<IPingResult> = redisResult.map((entry: string): IPingResult => {
    const jsonEntry: IPingResult = JSON.parse(entry)

    return jsonEntry
  })

  const check: ICheckSchema = pingList[0].check
  const history = pingList.map((ping: IPingResult): Pick<IPingResult, 'status' | 'responseTime' | 'timestamp'> => {
    return { status: ping.status, responseTime: ping.responseTime, timestamp: ping.timestamp }
  })

  return { check, history }
}
