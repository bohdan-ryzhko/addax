import * as Yup from 'yup';
import { emailRegex } from '../../../../constants';

export const validationSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex).required(),
  password: Yup.string().min(6).required(),
});
