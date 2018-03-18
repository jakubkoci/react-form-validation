import React from 'react'
import { Formik } from 'formik'
import './Form.css'

export default function Form() {

  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      render={props => {
        const { isSubmitting, errors, handleChange, handleSubmit } = props

        return (
          <div className="form">
            <label className="form-field" htmlFor="email">
              E-mail: <input name="email" type="email" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.email}</div>

            <label className="form-field" htmlFor="password">
              Password: <input name="password" type="password" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.password}</div>

            <label className="form-field" htmlFor="passwordConfirmation">
              Confirm password: <input name="passwordConfirmation" type="password" onChange={handleChange} />
            </label>
            <div className="form-field-error">{errors.passwordConfirmation}</div>

            <button onClick={handleSubmit}>{isSubmitting ? 'Loading' : 'Sign Up'}</button>
          </div>
        )
      }}
    />
  )
}

function validate(values) {
  const errors = {}

  if (!values.email) {
    errors.email = 'E-mail is required!'
  }

  if (!values.password) {
    errors.password = 'Password is required!'
  } else if (values.password.length < 6) {
    errors.password = 'Password has to be longer than 6 characters'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password confirmation is required!'
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords are not the same!'
  }

  return errors
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!')
    setSubmitting(false)
  }, 2000)
}