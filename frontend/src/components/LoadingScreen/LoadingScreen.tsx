import { FC } from 'react';
import { Loader } from '../index';

import styles from './LoadingScreen.module.scss';

export const LoadingScreen: FC = () => {
  return (
    <div className={styles.backdrop}>
      <Loader color="#30b0c7" />
    </div>
  );
};
