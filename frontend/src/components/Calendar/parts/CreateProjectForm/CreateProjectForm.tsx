import { FormikHelpers, useFormik } from 'formik';
import { Dispatch, FC, SetStateAction } from 'react';
import { CreateProjectValues } from '../../../../interfaces';
import { TextField } from '../../../TextField';
import { useAppDispatch, useReduxStore } from '../../../../hooks';
import { Button } from '../../../index';
import { getDisabled } from '../../../../utils';
import { createProject } from '../../../../redux';
import { validationSchema } from './utils';

import styles from './CreateProjectForm.module.scss';
import { unwrapResult } from '@reduxjs/toolkit';

const initialValues: CreateProjectValues = {
  name: '',
};

type Props = {
  setIsCreateProjectModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const CreateProjectForm: FC<Props> = ({ setIsCreateProjectModalOpen }) => {
  const { projects } = useReduxStore();
  const dispatch = useAppDispatch();

  const onSubmit = async (
    values: CreateProjectValues,
    helpers: FormikHelpers<CreateProjectValues>,
  ) => {
    const response = await dispatch(createProject(values)).then(unwrapResult);

    if (response.data.name) {
      helpers.resetForm();
      setIsCreateProjectModalOpen(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const disabled = getDisabled(formik);

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <TextField label={'Project name'} name={'name'} formik={formik} />
      <Button
        text={'Create project'}
        type="submit"
        loading={projects.creating}
        disabled={disabled}
      />
    </form>
  );
};
