import express from "express";
import cors from "cors";
// import morgan from 'morgan'

import limiter from "./utils/rateLimiter.js";
import { pinoHttpMiddleware } from "./utils/loggerHelper.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

import TodosRouter from "./routes/todoRoute.js";
import UserRouter from "./routes/userRoute.js";

// Create express instance
const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);
// app.use(morgan('tiny'))

// Custom json response
// app.use((req, res, next) => {
// 	const originJson = res.json

// 	res.json = function (body) {
// 		this.body = body
// 		originJson.call(this, body)

// 		return this
// 	}
// 	next()
// })

// app.use(pinoHttpMiddleware)

// app.use((_req, _res, next) => {
// 	console.log('Request Time: ', new Date());

// 	next()
// })

app.use("", UserRouter);
app.use("", TodosRouter);
// global error handler
app.use(globalErrorHandler);

export default app;
