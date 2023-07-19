import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(255)]),
    email: schema.string({}, [rules.email()]),
    phone: schema.string([rules.mobile({ locale: ['pt-BR'] })]),
    password: schema.string(),
  })

  public messages: CustomMessages = {}
}
