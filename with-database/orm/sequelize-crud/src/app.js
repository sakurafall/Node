import express from 'express';
import cors from 'cors';
import TodosRouter from './routes/todoRoute.js'
import { rateLimit } from 'express-rate-limit' 

const limiter = rateLimit({
	windowMs: 1000, // 1 second
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})


// Create express instance
const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter)

app.use('', TodosRouter)


export default app;