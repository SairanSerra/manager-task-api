import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100)
      table.string('description')
      table.enum('status', ['PENDING', 'INPROGRESS', 'COMPLETED']).defaultTo('PENDING')
      table.timestamp('createdAt').defaultTo(this.now())
      table.timestamp('updatedAt').defaultTo(this.now())
      table.timestamp('deletedAt').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
