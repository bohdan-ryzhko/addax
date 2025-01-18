import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { authUsersRouter, tasksRouter, projectRouter } from './src/routes';
import { errorHandler, notFound } from './src/middlewares';

dotenv.config();

const { CLIENT_URL = '' } = process.env;

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.json());

// auth
app.use('/api/v1/users/auth', authUsersRouter);

// tasks
app.use('/api/v1/tasks', tasksRouter);

// projects
app.use('/api/v1/projects', projectRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
