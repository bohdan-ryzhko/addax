import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../interfaces';
import { createTask, fetchTasks, updateTaskById } from './thunks';

const initialState: TasksState = {
  data: [
    // {
    //   name: 'test task 1',
    //   description: 'test task 1 description',
    //   id: '67880be71786164263da6e85',
    //   date: '2025-01-02',
    //   order: 0,
    //   project_id: '67880be71786164263da6e85',
    // },
    // {
    //   name: 'task 2',
    //   description: 'description 2',
    //   id: '6788f009684e21447dfbec95',
    //   date: '2025-01-02',
    //   order: 1,
    //   project_id: '6788f009684e21447dfbec95',
    // },
    // {
    //   name: 'task 3',
    //   description: 'description 3',
    //   id: 'gfdqw87d8219yh12h89',
    //   date: '2025-01-02',
    //   order: 1,
    //   project_id: '6788f009684e21447dfbec95',
    // },
  ],
  error: null,
  fetching: false,
  creating: false,
  updating: false,
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
        state.data = action.payload.data.sort((a, b) => a.order - b.order);
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
