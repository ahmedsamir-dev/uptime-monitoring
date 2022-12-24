import mongoose, { Schema } from 'mongoose'
import { Result } from 'ts-results'
import { GetReportDTO } from '@/report/report.dtos'
import PingStatus from '@/shared/enums/pingStatus.enum'

export interface IReportService {
  get(dto: GetReportDTO): Promise<Result<any, any>>
}

export interface IReportSchema extends mongoose.Document {
  status: PingStatus
  availability: number
  ups: number
  outages: number
  downtime: number
  uptime: number
  averageResponseTime: number
  history: []
  forCheck: Schema.Types.ObjectId
  timestamp: number
}
