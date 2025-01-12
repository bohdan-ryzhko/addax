import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { TasksState } from '../../interfaces';
import { createTask, fetchTasks } from './thunks';

const initialState: TasksState = {
  data: [],
  error: null,
  fetching: false,
  creating: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTask.pending, state => {
        state.creating = true;
      })
      .addCase(fetchTasks.pending, state => {
        state.fetching = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addMatcher(isAnyOf(createTask.fulfilled, fetchTasks.fulfilled), state => {
        state.creating = false;
        state.fetching = false;
        state.error = null;
      })
      .addMatcher(isAnyOf(createTask.rejected, fetchTasks.rejected), (state, action) => {
        state.creating = false;
        state.fetching = false;
        state.error = action.error;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
