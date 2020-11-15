import parser from 'csv-parser'
import statuses from './mappings/csv-status'

export default async(file, options) => {
  const { validator } = options
  const data = []
  const errors = null
  console.log(file, statuses)
  // TODO: implement csv parser
  console.log(parser)
  if (validator) {
    console.log(file, validator)
  }
  return [data, errors]
}
