import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    status: schema.enum(['PENDING', 'INPROGRESS', 'COMPLETED']),
  })

  public messages: CustomMessages = {}
}
