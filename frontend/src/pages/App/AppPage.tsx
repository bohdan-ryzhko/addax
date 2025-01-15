import { FC, useState } from 'react';
import { Link, Outlet } from 'react-router';
import Drawer from 'react-modern-drawer';
import { IoIosMenu } from 'react-icons/io';

import {
  clearCountriesState,
  clearHolidaysState,
  clearPropjectsState,
  clearTasksState,
  logout,
  setSelectedDay,
} from '../../redux';
import { routes } from '../../constants';
import { Button } from '../../components';
import { useAppDispatch, useReduxStore } from '../../hooks';

import 'react-modern-drawer/dist/index.css';

import styles from './appPage.module.scss';

export const AppPage: FC = () => {
  const { auth } = useReduxStore();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setSelectedDay(null));
    dispatch(clearCountriesState());
    dispatch(clearHolidaysState());
    dispatch(clearPropjectsState());
    dispatch(clearTasksState());
  };

  return (
    <>
      <header className={styles.header}>
        <button type="button" onClick={toggleDrawer}>
          <IoIosMenu size="2rem" />
        </button>
        <Button
          loading={auth.loading || auth.refreshing}
          text={'Logout'}
          className={styles.logoutBtn}
          onClick={handleLogout}
        />
      </header>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
        <nav>
          <Link className={'interactive'} onClick={toggleDrawer} to={routes.calendar}>
            Calendar
          </Link>
          <Link className={'interactive'} onClick={toggleDrawer} to={routes.settings}>
            Settings
          </Link>
        </nav>
      </Drawer>
      <Outlet />
    </>
  );
};
