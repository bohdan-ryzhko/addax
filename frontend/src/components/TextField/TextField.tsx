import { FormikValues } from 'formik';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './textField.module.scss';

type Props = {
  label: string;
  name: string;
  formik: FormikValues;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'name' | 'id' | 'onChange' | 'onBlur'
>;

export const TextField: FC<Props> = ({
  label,
  name,
  formik,
  className,
  type = 'text',
  ...props
}) => {
  const errorMessage = formik.errors[name];
  const isError = errorMessage && formik.touched[name];

  return (
    <div className={classNames(styles.wrapper, styles.inputWrapper)}>
      <label className={styles.label} htmlFor={name}>
        <span>{label}</span>
        <input
          className={classNames(styles.input, className)}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={name}
          id={name}
          value={formik.values[name]}
          {...props}
        />
      </label>
      {isError && <span className="errorText">{errorMessage}</span>}
    </div>
  );
};
