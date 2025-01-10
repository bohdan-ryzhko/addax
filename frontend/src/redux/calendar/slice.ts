import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarState } from '../../interfaces';

const initialState: CalendarState = {
  selectedDay: null,
  currentMonth: new Date(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDay(state, action: PayloadAction<Date | null>) {
      state.selectedDay = action.payload;
    },
    setCurrentMonth(state, action: PayloadAction<Date>) {
      state.currentMonth = action.payload;
    },
  },
});

export const { setSelectedDay, setCurrentMonth } = calendarSlice.actions;

export const calendarReducer = calendarSlice.reducer;
