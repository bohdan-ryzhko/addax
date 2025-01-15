import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { CountriesState } from '../../interfaces';
import { fetchAvailableCountries } from './thunks';

const initialState: CountriesState = {
  fetching: false,
  data: [],
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    clearCountriesState(state) {
      state.data = initialState.data;
      state.error = initialState.error;
      state.fetching = initialState.fetching;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAvailableCountries.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchAvailableCountries.fulfilled, (state, acion) => {
        state.data = acion.payload;
      })
      .addMatcher(isAnyOf(fetchAvailableCountries.fulfilled), state => {
        state.fetching = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchAvailableCountries.rejected), (state, action) => {
        state.fetching = false;
        state.error = action.error;
      });
  },
});

export const { clearCountriesState } = countriesSlice.actions;

export const countriesReducer = countriesSlice.reducer;
