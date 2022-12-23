import { ICheckService, ICheckSchema } from '@/check/check.interfaces'
import { CreateCheckDTO, GetCheckDTO, DeleteCheckDTO, UpdateCheckDTO } from '@/check/check.dtos'
import { Result, Ok, Err } from 'ts-results'
import Check from '@/check/check.model'
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

      return Ok(check)
    } else return Err('Error in creating check')
  }

  getOne = async (dto: GetCheckDTO): Promise<Result<ICheckSchema, string>> => {
    const check: ICheckSchema | null = await Check.findOne({ _id: dto.checkId, createdBy: dto.userId }, { __v: false })

    console.log(check)

    if (check == null) {
      return Err('Check not found')
    }
    return Ok(check)
  }

  update = async (dto: UpdateCheckDTO): Promise<Result<ICheckSchema, string>> => {
    console.log('dto', dto)

    const check: ICheckSchema | null = await Check.findOneAndUpdate({ _id: dto.checkId, createdBy: dto.userId }, dto)

    console.log(check)

    if (check == null) {
      return Err('Check not found')
    }

    return Ok(check)
  }

  delete = async (dto: DeleteCheckDTO): Promise<Result<true, string>> => {
    const check: ICheckSchema | null = await Check.findOneAndDelete({ _id: dto.checkId, createdBy: dto.userId })

    console.log(check)

    if (check == null) {
      return Err('Check not found')
    }

    await PingScheduler.deletePing(dto.checkId)

    return Ok(true)
  }
}
