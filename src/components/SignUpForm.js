import React from 'react'
import { Formik } from 'formik'
import Yup from 'yup'
import './SignUpForm.css'

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
}

export default function SignUpFormContainer() {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      render={SignUpForm}
    />
  )
}

function SignUpForm(props) {
  const { isSubmitting, errors, handleChange, handleSubmit } = props

  return (
    <div className="form">
      <label className="form-field" htmlFor="email">
        <span>E-mail:</span>
        <input name="email" type="email" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.email}</div>

      <label className="form-field" htmlFor="password">
        <span>Password:</span>
        <input name="password" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.password}</div>

      <label className="form-field" htmlFor="passwordConfirmation">
        <span>Confirm password:</span>
        <input name="passwordConfirmation" type="password" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.passwordConfirmation}</div>

      <label className="form-field" htmlFor="consent">
        <span>Consent:</span>
        <input name="consent" type="checkbox" onChange={handleChange} />
      </label>
      <div className="form-field-error">{errors.consent}</div>

      <button onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>
    </div>
  )
}

function validate(values) {
  const validationSchema = getValidationSchema(values)
  try {
    validationSchema.validateSync(values, { abortEarly: false })
    return {}
  } catch (error) {
    return getErrorsFromValidationError(error)
  }
}

function getValidationSchema(values) {
  return Yup.object().shape({
    email: Yup.string()
      .email('E-mail is not valid!')
      .required('E-mail is required!'),
    password: Yup.string()
      .min(6, 'Password has to be longer than 6 characters!')  
      .required('Password is required!'),
    passwordConfirmation: Yup.string()
      .oneOf([values.password], 'Passwords are not the same!')
      .required('Password confirmation is required!'),
    consent: Yup.bool()
      .test('consent', 'You have to agree with our Terms and Conditions!', value => value === true)
      .required('You have to agree with our Terms and Conditions!'),
  })
}

function getErrorsFromValidationError(validationError) {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!', values)
    setSubmitting(false)
  }, 2000)
}