import express from 'express';
import cors from 'cors';

import config from './config/index.js';
import limiter from './utils/rateLimiter.js';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';
import globalErrorHandler from './utils/globalErrorHandler.js';
import AppError from './utils/AppError.js';

import apiRouter from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttpMiddleware);
app.use(limiter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(config.apiPrefix, apiRouter);

app.use((req, _res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404, 'NotFound'));
});

app.use(globalErrorHandler);

export default app;
