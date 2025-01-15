import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../interfaces';
import { createTask, fetchTasks, updateTaskById } from './thunks';

const initialState: TasksState = {
  data: [],
  error: null,
  fetching: false,
  creating: false,
  updating: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateDndTasksById(state, action: PayloadAction<Pick<Task, 'id' | 'order'>>) {
      const { id, order } = action.payload;

      const taskIndex = state.data.findIndex(task => task.id === id);

      if (taskIndex < 0) return;

      state.data[taskIndex].order = order;

      state.data = state.data.map(task => {
        if (task.id !== id) {
          if (task.order >= order) {
            return { ...task, order: task.order - 1 };
          }
        }
        return task;
      });
    },
    clearTasksState(state) {
      state.data = initialState.data;
      state.error = initialState.error;
      state.fetching = initialState.fetching;
      state.creating = initialState.creating;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createTask.pending, state => {
        state.creating = true;
      })
      .addCase(fetchTasks.pending, state => {
        state.fetching = true;
      })
      .addCase(updateTaskById.pending, state => {
        state.updating = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        const updatedTaskIndex = state.data.findIndex(task => task.id === action.payload.data.id);

        if (updatedTaskIndex < 0) return;

        state.data.splice(updatedTaskIndex, 1, action.payload.data);
      })
      .addMatcher(
        isAnyOf(createTask.fulfilled, fetchTasks.fulfilled, updateTaskById.fulfilled),
        state => {
          state.creating = false;
          state.fetching = false;
          state.updating = false;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(createTask.rejected, fetchTasks.rejected, updateTaskById.rejected),
        (state, action) => {
          state.creating = false;
          state.fetching = false;
          state.updating = false;
          state.error = action.error;
        },
      );
  },
});

export const { updateDndTasksById, clearTasksState } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
