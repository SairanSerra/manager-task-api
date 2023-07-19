import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  private authService: AuthService
  constructor() {
    this.authService = new AuthService()
  }

  public async login({ request }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)
    return await this.authService.login(payload)
  }

  public async loggout() {
    return this.authService.loggout()
  }
}
