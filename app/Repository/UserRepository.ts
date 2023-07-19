import type { CreateDto } from 'App/Dtos/User/CreateDto'
import User from 'App/Models/User'

export default class UserRepository {
  private model: typeof User
  constructor() {
    this.model = User
  }

  public async getUserByEmail(email: string) {
    return await this.model.query().where('email', email).first()
  }

  public async create(data: CreateDto) {
    return await this.model.create(data)
  }
}
