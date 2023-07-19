import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFetch,
  beforeFind,
  beforeDelete,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName: 'phone' })
  public phone: number

  @column({ columnName: 'password', serializeAs: null })
  public password: string

  @column.dateTime({
    autoCreate: true,
    columnName: 'createdAt',
    serializeAs: 'createdAt',
    serialize: (value) => value.toFormat('dd/MM/yyyy HH:mm:ss'),
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'updatedAt',
  })
  public updatedAt: DateTime

  @column.dateTime({
    autoCreate: false,
    autoUpdate: false,
    serializeAs: null,
    columnName: 'deletedAt',
  })
  public deletedAt: DateTime | null
  @beforeSave()
  public static async encryptPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  @beforeDelete()
  public static softDelete = softDelete

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
