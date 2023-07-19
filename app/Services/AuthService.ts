import UserRepository from 'App/Repository/UserRepository'
import type { LoginDto } from './../Dtos/Auth/LoginDto'
import DefaultResponse from 'App/Utils/DefaultResponse'
import CustomException from 'App/Exceptions/CustomException'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContext } from '@adonisjs/core/build/standalone'
export default class AuthService {
  private repository: UserRepository
  private defaultResponse: DefaultResponse
  constructor() {
    this.repository = new UserRepository()
    this.defaultResponse = new DefaultResponse()
  }

  public async login({ email, password }: LoginDto) {
    const user = await this.repository.getUserByEmail(email)
    const useNotFound = !user
    const ctx = await HttpContext.get()

    if (useNotFound) {
      throw new CustomException('User not found', 404)
    }

    const passwordIsInvalid = !(await Hash.verify(user.password, password))

    if (passwordIsInvalid) {
      throw new CustomException('Email/Password invalid', 401)
    }
    const token = await ctx?.auth.use('api').generate(user, { expiresIn: '99999 dias' })

    const content = { user, token: token }
    return this.defaultResponse.isSuccessWithContent('User logged', 200, content)
  }
}
