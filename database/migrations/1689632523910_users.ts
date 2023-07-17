import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email')
      table.integer('phone', 12)
      table.timestamp('createdAt').defaultTo(this.now())
      table.timestamp('updatedAt').defaultTo(this.now())
      table.timestamp('deletedAt').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
