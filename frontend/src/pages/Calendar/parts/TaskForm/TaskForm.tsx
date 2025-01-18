import { FC, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { FormikHelpers, useFormik } from 'formik';

import { CreateTaskValues } from '../../../../interfaces';
import { useAppDispatch, useReduxStore } from '../../../../hooks';
import {
  createTask,
  deleteTask,
  selectTask,
  setSelectedDay,
  updateTaskById,
} from '../../../../redux';
import { Button, TextArea, TextField } from '../../../../components';

import { getDisabled, getFormattedDate } from '../../../../utils';
import { validationSchema } from './utils';

import styles from './taskForm.module.scss';
import classNames from 'classnames';

const initialValues: CreateTaskValues = {
  name: '',
  description: '',
};

export const TaskForm: FC = () => {
  const { auth, calendar, tasks, projects } = useReduxStore();
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: CreateTaskValues,
    { resetForm }: FormikHelpers<CreateTaskValues>,
  ) => {
    if (tasks.selectedTask && auth.user?.countryCode) {
      const updatedTaskResponse = await dispatch(
        updateTaskById({
          id: tasks.selectedTask.id,
          countryCode: auth.user?.countryCode,
          date: tasks.selectedTask.date,
          ...values,
        }),
      ).then(unwrapResult);

      if (updatedTaskResponse.data) {
        resetForm();
        dispatch(selectTask(null));
      }
      return;
    }

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

  useEffect(() => {
    if (tasks.selectedTask) {
      formik.setValues({
        name: tasks.selectedTask.name,
        description: tasks.selectedTask.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.selectedTask]);

  const disabled = getDisabled(formik);

  const handleDeletTask = async () => {
    const response =
      tasks.selectedTask && (await dispatch(deleteTask(tasks.selectedTask.id)).then(unwrapResult));

    if (response) {
      dispatch(selectTask(null));
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <TextField label={'Task name'} name={'name'} formik={formik} />
      <TextArea label={'Task description'} name={'description'} formik={formik} />
      <div className={styles.formActions}>
        <Button
          text={tasks.selectedTask ? 'Update task' : 'Create task'}
          type="submit"
          disabled={disabled}
          loading={tasks.creating || tasks.updating}
          className={styles.btnSubmit}
        />
        {tasks.selectedTask && (
          <button
            className={classNames('delete', styles.deleteButton)}
            type="button"
            onClick={handleDeletTask}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
};
