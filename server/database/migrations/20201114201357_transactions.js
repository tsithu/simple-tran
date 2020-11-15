const TABLE = 'transactions'

exports.up = async knex => {
  await knex.schema.createTable(TABLE, table => {
    table.increments()
    table.string('code', 50)
      .notNullable()
      .index()
    table.decimal('amount', 16, 2)
      .defaultTo(0)
    table.string('currency_code', 20)
      .notNullable()
      .index()
    table.datetime('transaction_date')
      .notNullable()
      .index()
    table.string('status', 50)
      .notNullable()
      .index()
    table.boolean('is_active')
      .defaultTo(true)
      .index()
    table
      .integer('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table
      .integer('updated_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
    table.timestamps(true, true)
  })

  await knex.schema.raw(`
    CREATE TRIGGER ${TABLE}_updated_at
    BEFORE UPDATE
    ON ${TABLE} FOR EACH ROW
    EXECUTE PROCEDURE set_current_timestamp_on_update();
  `)

  return Promise
}

exports.down = async knex => {
  await knex.raw(`DROP TABLE ${TABLE} CASCADE;`)
}
