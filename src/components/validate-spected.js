import spected from 'spected'

export default function validate(getValidationSchema) {
  return (values) => {
    const spec = getValidationSchema(values)
    const validationResult = spected(spec, values)
    return getErrorsFromValidationResult(validationResult)
  }
}

function getErrorsFromValidationResult(validationResult) {
  const FIRST_ERROR = 0
  return Object.keys(validationResult).reduce((errors, field) => {
    return validationResult[field] !== true
      ? { ...errors, [field]: validationResult[field][FIRST_ERROR] }
      : errors
  }, {})
}