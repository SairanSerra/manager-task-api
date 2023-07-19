import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum.optional(['PENDING', 'INPROGRESS', 'COMPLETED']),
    page: schema.number(),
  })

  public messages: CustomMessages = {}
}
