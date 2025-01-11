import { useFormik } from 'formik';
import { FC } from 'react';

import { CreateTaskValues } from '../../../../interfaces';
import { Button, TextArea, TextField } from '../../../../components';
import { validationSchema } from './utils';

import styles from './createTaskForm.module.scss';
import { getDisabled } from '../../../../utils';

const initialValues: CreateTaskValues = {
  name: '',
  description: '',
};

export const CreateTaskForm: FC = () => {
  const onSubmit = (values: CreateTaskValues) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const disabled = getDisabled(formik);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <TextField label={'Task name'} name={'name'} formik={formik} />
      <TextArea label={'Task description'} name={'description'} formik={formik} />
      <Button text={'Create task'} type="submit" disabled={disabled} />
    </form>
  );
};
