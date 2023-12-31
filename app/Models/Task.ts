import { DateTime } from 'luxon'
import { BaseModel, column, beforeFetch, beforeFind, beforeDelete } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'name' })
  public name: string

  @column({ columnName: 'description' })
  public description: string

  @column({ columnName: 'idUser', serializeAs: null })
  public idUser: number

  @column({ columnName: 'status' })
  public status: 'PENDING' | 'INPROGRESS' | 'COMPLETED'

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
