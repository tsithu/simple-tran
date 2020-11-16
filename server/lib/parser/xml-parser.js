import fs from 'fs'
import _ from 'lodash'
import parse from 'xml-parser'
import moment from 'moment'
import statusMappings from './mappings/xml-status'

export default async(file, options) => {
  const { validator: validate } = options
  const results = []
  const errors = []

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const xml = fs.readFileSync(file, 'utf8')
  const { root } = parse(xml)
  const { children } = root

  if (_.isArray(children)) {
    children.forEach(child => {
      const data = {
        code: _.get(child, 'attributes.id'),
        ...(arr => {
          const attrs = {}
          if (_.isArray(arr)) {
            arr.forEach(({ name, content, children: c1 }) => {
              switch (name.toLowerCase()) {
                case 'transactiondate':
                  attrs.transactionDate = moment(content, 'YYYY-MM-DD HH:mm:SS').toDate()
                  break
                case 'status':
                  attrs.status = statusMappings[content.toString()]
                  break
                case 'paymentdetails':
                  c1.forEach(({ name: c1Name, content: c1Content }) => {
                    switch (c1Name.toLowerCase()) {
                      case 'amount':
                        attrs.amount = parseFloat(c1Content)
                        break
                      case 'currencycode':
                        attrs.currencyCode = c1Content
                        break
                      default:
                        break
                    }
                  })
                  break
                default:
                  break
              }
            })
          }
          return attrs
        })(_.get(child, 'children'))
      }
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
  }
  return [results, errors.length > 0 ? errors : null]
}
