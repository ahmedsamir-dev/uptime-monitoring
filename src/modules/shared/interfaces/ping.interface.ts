import PingStatus from '@/shared/enums/pingStatus.enum'
import { ICheckSchema } from '@/modules/check/check.interfaces'

export interface IPingResult {
  check: ICheckSchema
  status: PingStatus
  responseTime: number
  timestamp: number
}

export interface IGetPingList {
  check: ICheckSchema
  history: Pick<IPingResult, 'status' | 'responseTime' | 'timestamp'>[]
}
