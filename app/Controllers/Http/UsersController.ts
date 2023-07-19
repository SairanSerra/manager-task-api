import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  private userService: UserService
  constructor() {
    this.userService = new UserService()
  }

  public async create({ request }: HttpContextContract) {
    const { phone, ...rest } = await request.validate(CreateUserValidator)
    return await this.userService.createUser({ ...rest, phone: Number(phone) })
  }
}
