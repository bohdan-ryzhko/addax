import { useEffect } from 'react';
import { useAppDispatch, useReduxStore } from './index';
import { refresh } from '../redux';

export const useRefresh = () => {
  const { auth } = useReduxStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth.accessToken || !auth.refreshToken) {
      return;
    }

    if (!auth.user) {
      dispatch(refresh(auth.refreshToken));
    }
  }, [auth.accessToken, auth.refreshToken, auth.user, dispatch]);
};
