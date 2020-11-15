const TABLE = 'transactions'

exports.seed = async knex => {
  await knex(TABLE).del()
  await knex.raw(`ALTER SEQUENCE ${TABLE}_id_seq RESTART WITH 1`)
  await knex(TABLE).insert([{
    code: 'Invoice0000000',
    amount: 1000000,
    currency_code: 'USD',
    transaction_date: new Date(),
    status: 'D',
    is_active: true,
    created_by: 1,
    updated_by: 1
  }])
  return Promise
}
