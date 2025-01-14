import { FC } from 'react';
import styles from './Loader.module.scss';

type LoaderProps = {
  size?: number;
  color?: string;
};

export const Loader: FC<LoaderProps> = ({ size = 40, color = '#000' }) => {
  return (
    <div
      className={styles.loader}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}></div>
  );
};
