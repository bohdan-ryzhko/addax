import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { tasksRouter } from './src/routes';
import { errorHandler, notFound } from './src/middlewares';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// tasks
app.use('/api/v1/tasks', tasksRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
