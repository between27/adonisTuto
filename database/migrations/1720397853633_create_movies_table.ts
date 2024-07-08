import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('status_id').unsigned().references('movie_statuses.id').nullable(),
        table.integer('writer_id').unsigned().references('cineasts.id').notNullable()
      table.integer('director_id').unsigned().references('cineasts.id').notNullable()
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.string('summary', 255).notNullable().defaultTo('')
      table.text('abstract').notNullable().defaultTo('')
      table.string('poster_url', 255).notNullable().defaultTo('')
      table.timestamp('released_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
