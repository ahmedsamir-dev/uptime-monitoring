import { IReportService, IReportSchema } from '@/report/report.interfaces'
import { GetReportDTO } from '@/report/report.dtos'
import { Result, Ok, Err } from 'ts-results'
import Report from '@/report/report.model'
import { getPingList } from '@/shared/cache/ping.cache'
import { IGetPingList } from '@/shared/interfaces/ping.interface'
import PingStatus from '@/shared/enums/pingStatus.enum'

export default class ReportService implements IReportService {
  get = async (dto: GetReportDTO): Promise<Result<any, any>> => {
    const pingList: IGetPingList = await getPingList(dto.checkId)

    const lastPingStatus: PingStatus = pingList.history[pingList.history.length - 1].status
    const outages = pingList.history.filter((ping) => ping.status === PingStatus.DOWN).length
    const ups = pingList.history.filter((ping) => ping.status === PingStatus.UP).length
    const uptime = (pingList.check.interval ?? 0) * ups
    const downtime = (pingList.check.interval ?? 0) * outages
    const availability = parseFloat(Number((uptime / (uptime + downtime)) * 100).toFixed(2))
    const averageResponseTime = parseFloat(
      Number(
        pingList.history.map((entry) => entry.responseTime).reduce((prev, curr): number => prev + curr, 0) /
          pingList.history.length
      ).toFixed(2)
    )

    const newReport: IReportSchema = {
      status: lastPingStatus,
      ups,
      outages,
      uptime,
      downtime,
      averageResponseTime,
      availability,
      //@ts-ignore
      history: pingList.history,
      timestamp: Date.now(),
      forCheck: pingList.check._id,
    }

    //Create the Report
    const report = await Report.create(newReport)
    if (!report._id) {
      return Err('Error in creating the report')
    }

    return Ok(newReport)
  }
}
