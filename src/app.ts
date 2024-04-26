import express from 'express';
import 'express-async-errors';
import exerciseRouter from './routes/exercise';
import ErrorHandler from './middlewares/error';

const app = express();

app.use(express.json());

app.use(exerciseRouter);

app.use(ErrorHandler.handle);

export default app;
