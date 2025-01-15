import { Routes, Route, Navigate } from 'react-router';

import { LoadingScreen, NotificationsContainer } from './components';
import { routes } from './constants';
import { PrivateRoute, RestrictedRoute } from './hocs';
import { useReduxStore, useRefresh } from './hooks';
import { AppPage, AuthPage, CalendarPage, SettingsPage } from './pages';

function App() {
  const { auth } = useReduxStore();

  useRefresh();

  return (
    <>
      {auth.refreshing && <LoadingScreen />}
      <Routes>
        <Route
          path={routes.base}
          element={<RestrictedRoute redirectTo={routes.app} component={<AuthPage />} />}
        />
        <Route path={routes.app} element={<AppPage />}>
          <Route index element={<Navigate to={routes.calendar} replace />} />
          <Route
            path={routes.calendar}
            element={<PrivateRoute redirectTo={routes.base} component={<CalendarPage />} />}
          />
          <Route
            path={routes.settings}
            element={<PrivateRoute redirectTo={routes.base} component={<SettingsPage />} />}
          />
        </Route>
      </Routes>
      <NotificationsContainer />
    </>
  );
}

export default App;
