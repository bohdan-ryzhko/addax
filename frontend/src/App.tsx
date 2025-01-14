import { Routes, Route } from 'react-router-dom';

import { LoadingScreen, NotificationsContainer } from './components';
import { routes } from './constants';
import { PrivateRoute, RestrictedRoute } from './hocs';
import { useReduxStore, useRefresh } from './hooks';
import { AuthPage, CalendarPage } from './pages';

function App() {
  const { auth } = useReduxStore();

  useRefresh();

  return (
    <>
      {auth.refreshing && <LoadingScreen />}
      <Routes>
        <Route
          path={routes.base}
          element={<RestrictedRoute redirectTo={routes.calendar} component={<AuthPage />} />}
        />
        <Route
          path={routes.calendar}
          element={<PrivateRoute redirectTo={routes.base} component={<CalendarPage />} />}
        />
      </Routes>
      <NotificationsContainer />
    </>
  );
}

export default App;
