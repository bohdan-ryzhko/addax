import { FC } from 'react';
import { useFormik } from 'formik';

import { useReduxStore } from '../../../../hooks';
import { IAuthData } from '../../../../interfaces';
import { Button, TextField } from '../../../../components';

import { validationSchema } from './utils';

import styles from './auth.module.scss';

const initialValues: IAuthData = {
  email: '',
  password: '',
};

type Props = {
  onSubmit: (values: IAuthData) => void;
  title: string;
  buttonText: string;
};

export const AuthComponent: FC<Props> = ({ onSubmit, title, buttonText }) => {
  const { auth } = useReduxStore();

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <TextField
            formik={formik}
            name="email"
            label="Email"
            type="email"
            placeholder="your.email@gmail.com"
          />
          <TextField
            formik={formik}
            name="password"
            label="Password"
            type="password"
            placeholder="•••••••••"
          />

          <Button text={buttonText} type="submit" loading={auth.loading} />
        </form>
      </div>
    </div>
  );
};
