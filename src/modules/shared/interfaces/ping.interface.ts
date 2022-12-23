import PingStatus from '@/shared/enums/pingStatus.enum'
import { ICheckSchema } from '@/modules/check/check.interfaces'

export default interface IPingResult {
  check: ICheckSchema
  status: PingStatus
  responseTime: number
}
