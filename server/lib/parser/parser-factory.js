import path from 'path'
import csvParser from './csv-parser'
import xmlParser from './xml-parser'

export default async(file, options) => {
  if (file) {
    const ext = path.extname(file)
    switch (ext.toLowerCase()) {
      case '.csv':
        return csvParser(file, options)
      case '.xml':
        return xmlParser(file, options)
      default:
        throw new Error(`Unknown format. Extension (${ext}) is not supported.`)
    }
  }
  throw new Error('File cannot be null or empty.')
}
