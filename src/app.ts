import express from 'express';
import 'express-async-errors';
import * as routers from './routes';

import ErrorHandler from './middlewares/error.middleware';

const app = express();

app.use(express.json());

Object.values(routers).forEach((router) => app.use(router));

app.use(ErrorHandler.handle);

export default app;
