import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { countriesReducer } from './countries';
import { holidaysReducer } from './holidays';
import { calendarReducer } from './calendar';
import { tasksReducer } from './tasks';
import { authReducer } from './auth';
import { projectsReducer } from './projects';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

export const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  countries: countriesReducer,
  holidays: holidaysReducer,
  calendar: calendarReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
