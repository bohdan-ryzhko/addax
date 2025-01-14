import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router';

import { RoutesType } from '../interfaces';
import { routes } from '../constants';
import { useReduxStore } from '../hooks';

type Props = {
  component: ReactNode;
  redirectTo?: RoutesType;
};

export const RestrictedRoute: FC<Props> = ({ component: Component, redirectTo = routes.base }) => {
  const { auth } = useReduxStore();

  return auth.user ? <Navigate to={redirectTo} /> : Component;
};
