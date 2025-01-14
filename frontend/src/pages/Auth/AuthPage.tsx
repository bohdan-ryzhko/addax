import { FC, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AuthComponent } from './parts';
import { useAppDispatch, useReduxStore } from '../../hooks';
import { fetchAvailableCountries, login, registration } from '../../redux';
import { IRegistrationData } from '../../interfaces';

import styles from './Auth.module.scss';

export const AuthPage: FC = () => {
  const { countries } = useReduxStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (countries.data.length > 0) return;

    dispatch(fetchAvailableCountries());
  }, [countries.data.length, dispatch]);

  return (
    <Tabs>
      <TabList className={styles.tabList}>
        <Tab className={styles.tab} selectedClassName={styles['tab--selected']}>
          Login
        </Tab>
        <Tab className={styles.tab} selectedClassName={styles['tab--selected']}>
          Registration
        </Tab>
      </TabList>

      <TabPanel>
        <AuthComponent
          onSubmit={values => dispatch(login(values))}
          title={'Login'}
          buttonText={'Sign in'}
        />
      </TabPanel>
      <TabPanel>
        <AuthComponent
          onSubmit={values => dispatch(registration(values as IRegistrationData))}
          title={'Registration'}
          buttonText={'Sign up'}
        />
      </TabPanel>
    </Tabs>
  );
};
