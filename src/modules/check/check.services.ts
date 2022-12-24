import { ICheckService, ICheckSchema } from '@/check/check.interfaces'
import { CreateCheckDTO, GetCheckDTO, DeleteCheckDTO, UpdateCheckDTO } from '@/check/check.dtos'
import { Result, Ok, Err } from 'ts-results'
import Check from '@/check/check.model'
import Report from '@/report/report.model'
import PingScheduler from '@/shared/schedulers/ping.scheduler'

export default class CheckService implements ICheckService {
  create = async (dto: CreateCheckDTO, userId: string): Promise<Result<ICheckSchema, string>> => {
    const isCheckAlreadyExist = await Check.exists({ url: dto.url })

    //Check is already exist
    if (isCheckAlreadyExist?._id) {
      return Err('Check already exists')
    }

    const check: ICheckSchema = await Check.create({ ...dto, createdBy: userId })

    if (check._id) {
      //Push the check to the PingQueue
      await PingScheduler.addPing(check)

      //Create Inital Report
      const report = await Report.create({
        status: 'up',
        availability: 0,
        outages: 0,
        downtime: 0,
        uptime: 0,
        averageResponseTime: 0,
        history: [{}],
        timestamp: Date.now(),
        forCheck: check._id,
      })

      return Ok(check)
    } else return Err('Error in creating check')
  }

  getOne = async (dto: GetCheckDTO): Promise<Result<ICheckSchema, string>> => {
    const check: ICheckSchema | null = await Check.findOne({ _id: dto.checkId, createdBy: dto.userId }, { __v: false })

    if (check == null) {
      return Err('Check not found')
    }
    return Ok(check)
  }

  update = async (dto: UpdateCheckDTO): Promise<Result<ICheckSchema, string>> => {
    const check: ICheckSchema | null = await Check.findOneAndUpdate({ _id: dto.checkId, createdBy: dto.userId }, dto)

    if (check == null) {
      return Err('Check not found')
    }

    //Delete the old check from the ping scheduler
    await PingScheduler.deletePing(dto.checkId)

    // Get the new data
    //@ts-ignore
    const newcheck: ICheckSchema = await Check.findOne({ _id: dto.checkId, createdBy: dto.userId }, { __v: false })

    //Then add the new one
    await PingScheduler.addPing(newcheck)

    return Ok(newcheck)
  }

  delete = async (dto: DeleteCheckDTO): Promise<Result<true, string>> => {
    const check: ICheckSchema | null = await Check.findOneAndDelete({ _id: dto.checkId, createdBy: dto.userId })

    if (check == null) {
      return Err('Check not found')
    }

    await PingScheduler.deletePing(dto.checkId)

    return Ok(true)
  }
}
