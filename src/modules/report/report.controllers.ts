import { Router, Request, Response, NextFunction } from 'express'
import IController from '@/shared/interfaces/controller.interface'
import { IReportService } from '@/report/report.interfaces'
import HttpException from '@/shared/errors/errors.httpException'
import { authenticationMiddleWare } from '@/shared/middlewares/authentication.middleware'

class ReportController implements IController {
  public readonly path = '/reports'
  public readonly router = Router()

  private reportService: IReportService
  constructor(reportService: IReportService) {
    this.reportService = reportService
    this.intializeRoutes()
  }

  private intializeRoutes(): void {
    this.router.get(`${this.path}/:checkId`, authenticationMiddleWare, this.getOne)
  }

  private getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await this.reportService.get({ checkId: req.params.checkId, userId: res.locals.userId })

    if (data.ok) {
      res.status(200).json({
        message: 'Report created',
        data: data.val,
      })
    } else next(new HttpException(data.val, 400))
  }
}

export default ReportController
