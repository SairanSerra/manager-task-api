import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class DefaultResponse {
  private http: typeof HttpContext

  constructor() {
    this.http = HttpContext
  }
  public async isSuccess(message: string, statusCode: number) {
    const ctx = await this.http.get()

    const response = {
      statusCode,
      message,
    }

    return await ctx?.response.status(statusCode).json(response)
  }
  public async isSuccessWithContent(message: string, statusCode: number, content: any) {
    const ctx = await this.http.get()

    const response = {
      statusCode,
      message,
      content,
    }

    return await ctx?.response.status(statusCode).json(response)
  }
}
