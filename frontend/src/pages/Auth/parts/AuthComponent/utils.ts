import * as Yup from 'yup';
import { emailRegex } from '../../../../constants';

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, 'Eneter a valid email').required(),
  password: Yup.string().min(6).required(),
});

export const validationRegistrationSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, 'Eneter a valid email').required(),
  password: Yup.string().min(6).required(),
  countryCode: Yup.string().required('select a country'),
});
