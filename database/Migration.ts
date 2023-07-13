/* eslint-disable @typescript-eslint/explicit-member-accessibility */
const { BaseCommand } = require('@adonisjs/core/build/standalone')
const { createConnection } = require('typeorm')

class Migration extends BaseCommand {
  static get signature() {
    return 'migration:run'
  }

  static get description() {
    return 'Run TypeORM migrations'
  }

  async handle() {
    const connection = await createConnection()

    try {
      await connection.runMigrations()
      this.success('Migrations successfully run')
    } catch (error) {
      this.error(`An error occurred while running migrations: ${error.message}`)
    } finally {
      await connection.close()
    }
  }
}

module.exports = Migration
