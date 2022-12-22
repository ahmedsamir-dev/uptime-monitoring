import IController from '@/shared/interfaces/controller.interface'
import UserController from '@/modules/user/user.controllers'
import UserService from '@/modules/user/user.services'

export const controllers: IController[] = [new UserController(new UserService())]
