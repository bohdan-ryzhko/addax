import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { Project, PropjectsState } from '../../interfaces';
import { createProject, deleteProject, fetchProjects } from './thunks';

const initialState: PropjectsState = {
  fetching: false,
  creating: false,
  deleting: false,
  data: [],
  selectedProject: null,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectProject(state, action: PayloadAction<Project | null>) {
      state.selectedProject = action.payload;
    },
    clearPropjectsState(state) {
      state.data = initialState.data;
      state.error = initialState.error;
      state.fetching = initialState.fetching;
      state.creating = initialState.creating;
      state.selectedProject = initialState.selectedProject;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProjects.pending, state => {
        state.fetching = true;
      })
      .addCase(createProject.pending, state => {
        state.creating = true;
      })
      .addCase(deleteProject.pending, state => {
        state.deleting = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.data = state.data.filter(project => project.id !== action.payload);
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addMatcher(
        isAnyOf(fetchProjects.fulfilled, createProject.fulfilled, deleteProject.fulfilled),
        state => {
          state.fetching = false;
          state.creating = false;
          state.deleting = false;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(fetchProjects.rejected, createProject.rejected, deleteProject.rejected),
        (state, action) => {
          state.fetching = false;
          state.creating = false;
          state.deleting = false;
          state.error = action.error;
        },
      );
  },
});

export const { selectProject, clearPropjectsState } = projectsSlice.actions;

export const projectsReducer = projectsSlice.reducer;
