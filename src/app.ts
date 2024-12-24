import express from 'express';
import 'express-async-errors';
import executionRouter from './routes/execution.router';
import exerciseRouter from './routes/exercise.router';
import ErrorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(executionRouter);
app.use(exerciseRouter);

app.use(ErrorHandler.handle);

export default app;
