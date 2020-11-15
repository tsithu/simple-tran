import fs from 'fs'
import csv from 'csv-parser'
import statusMappings from './mappings/csv-status'

export default async(file, options) => {
  const { validator: validate } = options
  const results = []
  const errors = []

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.createReadStream(file)
    .pipe(csv(['code', 'amount', 'currencyCode', 'transactionDate', 'status']))
    .on('data', data => {
      if (validate) {
        const [record, validationError] = validate(data)
        if (validationError) {
          errors.push(validationError)
        } else {
          record.status = statusMappings[record.status]
          results.push(record)
        }
      } else {
        results.push(data)
      }
    })
    .on('end', () => {
      console.log(results)
    })

  return [results, errors.length > 0 ? errors : null]
}
