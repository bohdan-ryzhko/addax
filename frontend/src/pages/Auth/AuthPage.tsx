import { FC } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AuthComponent } from './parts';
import { useAppDispatch } from '../../hooks';
import { login, registration } from '../../redux';

export const AuthPage: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Registration</Tab>
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
          onSubmit={values => dispatch(registration(values))}
          title={'Registration'}
          buttonText={'Sign up'}
        />
      </TabPanel>
    </Tabs>
  );
};
