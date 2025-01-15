import { FC, useMemo } from 'react';
import { useFormik } from 'formik';

import { useReduxStore } from '../../../../hooks';
import { ILoginData, IRegistrationData } from '../../../../interfaces';
import { Button, Dropdown, TextField } from '../../../../components';

import { validationLoginSchema, validationRegistrationSchema } from './utils';

import styles from './auth.module.scss';

const initialValuesLogin: ILoginData = {
  email: '',
  password: '',
};

const initialValuesRegistration: IRegistrationData = {
  email: '',
  password: '',
  countryCode: '',
};

type Props = {
  onSubmit: (values: ILoginData | IRegistrationData) => void;
  title: string;
  buttonText: string;
};

export const AuthComponent: FC<Props> = ({ onSubmit, title, buttonText }) => {
  const { auth, countries } = useReduxStore();

  const iRegistration = title === 'Registration';

  const formik = useFormik({
    initialValues: iRegistration ? initialValuesRegistration : initialValuesLogin,
    onSubmit,
    validationSchema: iRegistration ? validationRegistrationSchema : validationLoginSchema,
  });

  const dropdownList = useMemo(
    () =>
      countries.data.map(({ countryCode, name }) => ({
        id: countryCode,
        label: name,
      })),
    [countries.data],
  );

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

          {iRegistration && (
            <div className={styles.dropdownWrapper}>
              <Dropdown
                list={dropdownList}
                element={item => <p>{item.label}</p>}
                onChange={selectCountry => formik.setFieldValue('countryCode', selectCountry.id)}
              />
              {(formik.errors as IRegistrationData).countryCode &&
                (formik.touched as unknown as IRegistrationData).countryCode && (
                  <span className="errorText">
                    {(formik.errors as IRegistrationData).countryCode}
                  </span>
                )}
            </div>
          )}

          <Button text={buttonText} type="submit" loading={auth.loading} />
        </form>
      </div>
    </div>
  );
};
