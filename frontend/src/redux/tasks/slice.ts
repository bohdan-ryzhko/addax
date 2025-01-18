import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../interfaces';
import { createTask, deleteTask, fetchTasks, updateTaskById } from './thunks';

const initialState: TasksState = {
  data: [],
  error: null,
  fetching: false,
  creating: false,
  updating: false,
  deleting: false,
  selectedTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateDndTasksById(state, action: PayloadAction<{ date: string; tasks: Task[] }>) {
      const { date, tasks } = action.payload;
      state.data = state.data.filter(task => task.date !== date);
      state.data.push(...tasks);
    },
    selectTask(state, action: PayloadAction<Task | null>) {
      state.selectedTask = action.payload;
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
      .addCase(deleteTask.pending, state => {
        state.deleting = true;
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
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter(task => task.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          createTask.fulfilled,
          fetchTasks.fulfilled,
          updateTaskById.fulfilled,
          deleteTask.fulfilled,
        ),
        state => {
          state.creating = false;
          state.fetching = false;
          state.updating = false;
          state.deleting = false;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          createTask.rejected,
          fetchTasks.rejected,
          updateTaskById.rejected,
          deleteTask.rejected,
        ),
        (state, action) => {
          state.creating = false;
          state.fetching = false;
          state.updating = false;
          state.deleting = false;
          state.error = action.error;
        },
      );
  },
});

export const { updateDndTasksById, clearTasksState, selectTask } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
