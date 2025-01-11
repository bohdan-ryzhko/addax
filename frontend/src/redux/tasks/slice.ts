import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { TasksState } from '../../interfaces';
import { createTask } from './thunks';

const initialState: TasksState = {
  loading: false,
  data: [],
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTask.pending, state => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addMatcher(isAnyOf(createTask.fulfilled), state => {
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(createTask.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
