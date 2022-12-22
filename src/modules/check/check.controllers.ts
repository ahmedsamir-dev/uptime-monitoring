import { Router, Request, Response, NextFunction } from 'express'
import IController from '@/shared/interfaces/controller.interface'
import validationMiddleWare from '@/shared/middlewares/validation.middleware'
import { createCheckSchema } from '@/check/check.validations'
import { ICheckService } from '@/check/check.interfaces'
import HttpException from '@/shared/errors/errors.httpException'
import { signJWT, verifyJWT } from '@/shared/utils/jwt.utils'

class CheckController implements IController {
  public readonly path = '/checks'
  public readonly router = Router()

  private checkService: ICheckService
  constructor(checkService: ICheckService) {
    this.checkService = checkService
    this.intializeRoutes()
  }

  private intializeRoutes(): void {
    this.router.post(`${this.path}/`, validationMiddleWare(createCheckSchema), this.create)
    this.router.get(`${this.path}/:id`, validationMiddleWare(createCheckSchema), this.getOne)
    this.router.patch(`${this.path}/:id`, validationMiddleWare(createCheckSchema), this.update)
    this.router.delete(`${this.path}/:id`, validationMiddleWare(createCheckSchema), this.delete)
  }

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.create(req.body)
  }

  private getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.getOne(req.body)
  }

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.update(req.body)
  }

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.delete(req.body)
  }
}

export default CheckController
