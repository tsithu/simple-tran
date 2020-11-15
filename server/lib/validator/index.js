export default (data, options) => {
  const errors = []
  // TODO: implement validator
  console.log(data)
  console.log(options)

  return [data, errors.length > 0 ? errors : null]
}
