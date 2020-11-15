import _ from 'lodash'

export default data => {
  const errors = []

  if (_.isEmpty(data.code)) {
    errors.push('code cannot be empty')
  }

  if (!_.isNumber(data.amount)) {
    errors.push('amount must be valid number')
  }

  if (!_.isDate(data.transactionDate)) {
    errors.push('transactionDate must be valid date')
  }

  if (_.isEmpty(data.currencyCode)) {
    errors.push('currencyCode cannot be empty')
  }

  if (_.isEmpty(data.status)) {
    errors.push('status cannot be empty')
  }

  return [data, errors.length > 0 ? errors : null]
}
