import { CreateDto } from 'App/Dtos/User/CreateDto'
import CustomException from 'App/Exceptions/CustomException'
import UserRepository from 'App/Repository/UserRepository'
import DefaultResponse from 'App/Utils/DefaultResponse'

export default class UserService {
  private repository: UserRepository
  private defaultResponse: DefaultResponse
  constructor() {
    this.repository = new UserRepository()
    this.defaultResponse = new DefaultResponse()
  }

  public async createUser({ email, ...rest }: CreateDto) {
    const verifyUseHasExist = await this.repository.getUserByEmail(email)
    const userHasExist = verifyUseHasExist

    if (userHasExist) {
      throw new CustomException('User has exist', 400)
    }

    // create User
    this.repository.create({ ...rest, email: email })
    return await this.defaultResponse.isSuccess('Usuário cadastrado com sucesso', 201)
  }
}
