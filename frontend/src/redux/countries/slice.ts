import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { CountriesState } from '../../interfaces';
import { fetchAvailableCountries } from './thunks';

const initialState: CountriesState = {
  loading: false,
  data: [],
  error: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAvailableCountries.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAvailableCountries.fulfilled, (state, acion) => {
        state.data = acion.payload;
      })
      .addMatcher(isAnyOf(fetchAvailableCountries.fulfilled), state => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchAvailableCountries.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
