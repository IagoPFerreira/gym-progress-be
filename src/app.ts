import express from 'express';
import 'express-async-errors';
import exerciseAggregateRouter from './routes/exerciseAggregate.router';
import exerciseRouter from './routes/exercise.router';
import ErrorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(exerciseAggregateRouter);
app.use(exerciseRouter);

app.use(ErrorHandler.handle);

export default app;
