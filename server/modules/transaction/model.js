import BaseModel from '$/modules/core/base/model'

export default class TransactionModel extends BaseModel {
  static get modelName() {
    return 'Transaction'
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema
    const { required, properties } = baseSchema
    return {
      required: [
        'code',
        'currencyCode',
        'transactionDate',
        'status',
        ...required
      ],
      properties: {
        code: { type: 'string', minLength: 1, maxLength: 50 },
        amount: { type: ['number', 'null'] },
        currencyCode: { type: 'string', minLength: 1, maxLength: 20 },
        transactionDate: { type: 'datetime' },
        status: { type: 'string', minLength: 1, maxLength: 50 },
        ...properties
      }
    }
  }
}
