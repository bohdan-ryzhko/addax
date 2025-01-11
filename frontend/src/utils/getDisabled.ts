import { FormikValues } from 'formik';

export const getDisabled = (formik: FormikValues) =>
  Object.values(formik.values).some(value => value === '') ||
  Object.values(formik.errors).length > 0;
