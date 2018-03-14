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
        const { handleChange, handleSubmit } = props

        return (
          <div className="form">
            <label className="form-field" htmlFor="email">
              E-mail: <input name="email" type="email" onChange={handleChange} />
            </label>
            <label className="form-field" htmlFor="password">
              Password: <input name="password" type="password" onChange={handleChange} />
            </label>
            <label className="form-field" htmlFor="passwordConfirmation">
              Confirm password: <input name="passwordConfirmation" type="password" onChange={handleChange} />
            </label>
            <button onClick={handleSubmit}>Sign Up</button>
          </div>
        )
      }}
    />
  )
}

function validate(values) {
  return {}
}

function onSubmit(values, { setSubmitting, setErrors }) {
  setTimeout(() => {
    console.log('User has been sucessfully saved!')
    setSubmitting(false)
  }, 2000)
}