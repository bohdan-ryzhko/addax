import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { holidaysState } from '../../interfaces';
import { fetchPublicHolidays } from './thunks';

const initialState: holidaysState = {
  loading: false,
  data: [],
  error: null,
};

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPublicHolidays.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPublicHolidays.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(isAnyOf(fetchPublicHolidays.fulfilled), state => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchPublicHolidays.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const holidaysReducer = holidaysSlice.reducer;
