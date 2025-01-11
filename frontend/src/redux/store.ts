import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countries';
import { holidaysReducer } from './holidays';
import { calendarReducer } from './calendar';
import { tasksReducer } from './tasks';

export const reducer = combineReducers({
  countries: countriesReducer,
  holidays: holidaysReducer,
  calendar: calendarReducer,
  tasks: tasksReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
