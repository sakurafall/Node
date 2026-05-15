import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import rateLimiter from './utils/rateLmiter.ts';
import {pinoHttpMiddleware} from './utils/loggerHelper.ts';
import swaggerDocument from './openApi.json' with {type: 'json'} ;

import urlRecordRouter from './routes/urlRecordRoute.ts';
import urlRedirectRouter from './routes/urlRedirectRoute.ts';

const app = express();

// TODO: Auth

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(rateLimiter);
app.use(pinoHttpMiddleware);

app.use('/v1', urlRecordRouter);
app.use('/v1', urlRedirectRouter);

// TODO: Global error handler

export default app;