import { useFormik } from 'formik';
import { FC } from 'react';

import { CreateTaskValues } from '../../../../interfaces';
import { Button, TextArea, TextField } from '../../../../components';
import { validationSchema } from './utils';

import styles from './createTaskForm.module.scss';
import { getDisabled, getFormattedDate } from '../../../../utils';
import { useAppDispatch, useReduxStore } from '../../../../hooks';
import { createTask } from '../../../../redux';

const initialValues: CreateTaskValues = {
  name: '',
  description: '',
};

export const CreateTaskForm: FC = () => {
  const { calendar, countries, tasks } = useReduxStore();
  const dispatch = useAppDispatch();

  const onSubmit = (values: CreateTaskValues) => {
    if (!calendar.selectedDay || !countries.selectedCountry) return;

    dispatch(
      createTask({
        name: values.name,
        description: values.description,
        date: getFormattedDate(calendar.selectedDay),
        countryCode: countries.selectedCountry.countryCode,
      }),
    );
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
      <Button text={'Create task'} type="submit" disabled={disabled} loading={tasks.creating} />
    </form>
  );
};
