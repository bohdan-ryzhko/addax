import { FC } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { FormikHelpers, useFormik } from 'formik';

import { CreateTaskValues } from '../../../../interfaces';
import { useAppDispatch, useReduxStore } from '../../../../hooks';
import { createTask, setSelectedDay } from '../../../../redux';
import { Button, TextArea, TextField } from '../../../../components';

import { getDisabled, getFormattedDate } from '../../../../utils';
import { validationSchema } from './utils';

import styles from './createTaskForm.module.scss';

const initialValues: CreateTaskValues = {
  name: '',
  description: '',
};

export const CreateTaskForm: FC = () => {
  const { calendar, auth, tasks, projects } = useReduxStore();
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: CreateTaskValues,
    { resetForm }: FormikHelpers<CreateTaskValues>,
  ) => {
    if (!calendar.selectedDay || !auth.user?.countryCode || !projects.selectedProject) return;

    const createdTaskResponse = await dispatch(
      createTask({
        name: values.name,
        description: values.description,
        date: getFormattedDate(calendar.selectedDay),
        countryCode: auth.user?.countryCode,
        project_id: projects.selectedProject.id,
      }),
    ).then(unwrapResult);

    if (createdTaskResponse.data) {
      resetForm();
      dispatch(setSelectedDay(null));
    }
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
