import IController from '@/shared/interfaces/controller.interface'
import UserController from '@/modules/user/user.controllers'
import UserService from '@/modules/user/user.services'
import CheckController from '@/check/check.controllers'
import CheckService from '@/check/check.services'
import ReportController from '@/report/report.controllers'
import ReportService from '@/report/report.services'

export const controllers: IController[] = [
  new UserController(new UserService()),
  new CheckController(new CheckService()),
  new ReportController(new ReportService()),
]
