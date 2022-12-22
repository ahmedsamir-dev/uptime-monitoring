import { ICheckService, ICheckSchema } from '@/check/check.interfaces'
import { CreateCheckDTO } from '@/check/check.dtos'
import { Result, Ok, Err } from 'ts-results'
import Check from '@/check/check.model'

export class CheckService implements ICheckService {
  create = async (dto: CreateCheckDTO): Promise<Result<string, string>> => {
    const isCheckAlreadyExist = await Check.exists({ url: dto.url })

    //User is already signed up
    if (isCheckAlreadyExist?._id) {
      return Err('Check already exists')
    }

    const check: ICheckSchema = await Check.create(dto)

    if (1) return Ok('')
    else return Err('')
  }
  getOne = async (dto: CreateCheckDTO): Promise<Result<string, string>> => {
    if (1) return Ok('')
    else return Err('')
  }
  update = async (dto: CreateCheckDTO): Promise<Result<string, string>> => {
    if (1) return Ok('')
    else return Err('')
  }
  delete = async (dto: CreateCheckDTO): Promise<Result<string, string>> => {
    if (1) return Ok('')
    else return Err('')
  }
}
