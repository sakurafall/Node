import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './openapi.json' with {type: 'json'} ;

import urlRecordRouter from './routes/urlRecordRoute.js';
import urlRedirectRouter from './routes/urlRedirectRoute.js';

const app = express();

// TODO: Auth

app.use(express.json());
app.use(cors({
  origin: process.env.PROJECT_URL,
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TODO: Rate limiter

app.use('/v1', urlRecordRouter);
app.use('/v1', urlRedirectRouter);

// TODO: Global error handler

export default app;