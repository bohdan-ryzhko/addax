import { combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { countriesReducer } from './countries';

axios.defaults.baseURL = 'https://date.nager.at/';

export const reducer = combineReducers({
  countries: countriesReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
