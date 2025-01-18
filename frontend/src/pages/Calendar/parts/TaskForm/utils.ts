import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(5).required(),
  description: Yup.string().min(10).required(),
});
