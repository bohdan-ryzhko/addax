import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import classNames from 'classNames';

import styles from './button.module.scss';

type Props = {
  text: string;
  loading?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<Props> = ({
  text,
  type = 'button',
  disabled,
  loading,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        disabled || loading ? styles.disabledButton : '',
        className,
      )}
      disabled={disabled || loading}
      type={type}
      {...props}>
      <span>
        {text}
        {loading && <span className={styles.loader} />}
      </span>
    </button>
  );
};
