import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';
import { FormikValues } from 'formik';
import classNames from 'classNames';

import styles from './textField.module.scss';

type Props = {
  label: string;
  name: string;
  formik: FormikValues;
} & Omit<
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  'name' | 'id' | 'onChange' | 'onBlur'
>;

export const TextArea: FC<Props> = ({ label, name, formik, className, ...props }) => {
  const errorMessage = formik.errors[name];
  const isError = errorMessage && formik.touched[name];

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        <span>{label}</span>
        <textarea
          name={name}
          id={name}
          className={classNames(styles.textarea, className)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          {...props}
        />
      </label>
      {isError && <span className="errorText">{errorMessage}</span>}
    </div>
  );
};
