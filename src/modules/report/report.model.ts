import { Schema, model } from 'mongoose'
import { IReportSchema } from '@/report/report.interfaces'

const reportSchema = new Schema<IReportSchema>({
  status: { type: String, required: true },
  availability: { type: Number, required: true },
  ups: { type: Number, required: true },
  outages: { type: Number, required: true },
  downtime: { type: Number, required: true },
  uptime: { type: Number, required: true },
  averageResponseTime: { type: Number, required: true },
  history: { type: [], required: true },
  timestamp: { type: Number, required: true },
  forCheck: { type: Schema.Types.ObjectId, ref: 'Check' },
})

const Report = model<IReportSchema>('Report', reportSchema)

export default Report
