import { Router, Request, Response, NextFunction } from 'express'
import IController from '@/shared/interfaces/controller.interface'
import validationMiddleWare from '@/shared/middlewares/validation.middleware'
import { createCheckSchema, updateCheckSchema } from '@/check/check.validations'
import { ICheckService } from '@/check/check.interfaces'
import HttpException from '@/shared/errors/errors.httpException'
import { authenticationMiddleWare } from '@/shared/middlewares/authentication.middleware'

class CheckController implements IController {
  public readonly path = '/checks'
  public readonly router = Router()

  private checkService: ICheckService
  constructor(checkService: ICheckService) {
    this.checkService = checkService
    this.intializeRoutes()
  }

  private intializeRoutes(): void {
    this.router.post(`${this.path}/`, authenticationMiddleWare, validationMiddleWare(createCheckSchema), this.create)
    this.router.get(`${this.path}/:id`, authenticationMiddleWare, this.getOne)
    this.router.patch(
      `${this.path}/:id`,
      authenticationMiddleWare,
      validationMiddleWare(updateCheckSchema),
      this.update
    )
    this.router.delete(`${this.path}/:id`, authenticationMiddleWare, this.delete)
  }

  private create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.create(req.body, res.locals.userId)

    if (data.ok) {
      res.status(200).json({
        message: 'Check created',
        data: data.val,
      })
    } else next(new HttpException(data.val, 400))
  }

  private getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.getOne({ checkId: req.params.id, userId: res.locals.userId })

    if (data.ok) {
      res.status(200).json({
        message: 'Check found',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  private update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.update({ checkId: req.params.id, userId: res.locals.userId, ...req.body })
    if (data.ok) {
      res.status(200).json({
        message: 'Check updated',
        data: data.val,
      })
    } else next(new HttpException(data.val, 404))
  }

  private delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.checkService.delete({ checkId: req.params.id, userId: res.locals.userId })

    if (data.ok) {
      res.status(204).json()
    } else next(new HttpException(data.val, 404))
  }
}

export default CheckController
