import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    status: schema.enum(['PENDING', 'INPROGRESS', 'COMPLETED']),
    id: schema.number(),
  })

  public messages: CustomMessages = {}
}
