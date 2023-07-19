import { HttpContext } from '@adonisjs/core/build/standalone'

export default class DataUser {
  public async user() {
    const ctx = await HttpContext.get()
    const user = await ctx!.auth.use('api').user
    return user
  }
}
