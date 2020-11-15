import fs from 'fs'
import csv from 'csv-parser'
import moment from 'moment'
import statusMappings from './mappings/csv-status'

export default async(file, options) => {
  const { validator: validate } = options
  const results = []
  const errors = []
  const headers = ['code', 'amount', 'currencyCode', 'transactionDate', 'status']
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.createReadStream(file)
    .pipe(csv({
      headers,
      mapValues: ({ header, value }) => {
        switch (header) {
          case 'amount':
            return parseFloat(value)
          case 'transactionDate':
            return moment(value, 'DD/MM/YYYY hh:mm:ss').toDate()
          case 'status':
            return statusMappings[value.toString()]
          default:
            return value
        }
      }
    }))
    .on('data', data => {
      if (validate) {
        const [record, validationError] = validate(data)
        if (validationError) {
          errors.push(validationError)
        }
        results.push(record)
      } else {
        results.push(data)
      }
    })
    .on('error', err => {
      reject(err)
    })
    .on('end', () => {
      resolve([results, errors.length > 0 ? errors : null])
    })
  })
}
