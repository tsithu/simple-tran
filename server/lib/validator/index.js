import status from './mappings/csv-status'

export default (data, options) => {
  const errors = []
  // TODO: implement validator
  return {
    isValid: errors.length === 0,
    errors
  }
}
