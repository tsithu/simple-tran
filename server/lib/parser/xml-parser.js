import parser from 'xml-parser'
import statuses from './mappings/csv-status'

export default async(file, options) => {
  const { validator } = options
  console.log(file, statuses)
  // TODO: implement xml parser
  console.log(parser)
  if (validator) {
    console.log(file, validator)
  }
  return []
}
