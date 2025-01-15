import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { HolidaysState } from '../../interfaces';
import { fetchPublicHolidays } from './thunks';

const initialState: HolidaysState = {
  fetching: false,
  data: [],
  error: null,
};

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {
    clearHolidaysState(state) {
      state.data = initialState.data;
      state.error = initialState.error;
      state.fetching = initialState.fetching;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPublicHolidays.pending, state => {
        state.fetching = true;
      })
      .addCase(fetchPublicHolidays.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(isAnyOf(fetchPublicHolidays.fulfilled), state => {
        state.fetching = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchPublicHolidays.rejected), (state, action) => {
        state.fetching = false;
        state.error = action.error;
      });
  },
});

export const { clearHolidaysState } = holidaysSlice.actions;

export const holidaysReducer = holidaysSlice.reducer;
