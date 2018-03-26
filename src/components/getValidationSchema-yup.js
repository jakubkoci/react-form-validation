import Yup from 'yup'
import { MIN_PASSWORD_LENGTH } from './const'

export default function getYupValidationSchema(values) {
  return Yup.object().shape({
    email: Yup.string()
      .email('E-mail is not valid!')
      .required('E-mail is required!'),
    password: Yup.string()
      .min(MIN_PASSWORD_LENGTH, `Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`)  
      .required('Password is required!'),
    passwordConfirmation: Yup.string()
      .oneOf([values.password], 'Passwords are not the same!')
      .required('Password confirmation is required!'),
    consent: Yup.bool()
      .test('consent', 'You have to agree with our Terms and Conditions!', value => value === true)
      .required('You have to agree with our Terms and Conditions!'),
  })
}