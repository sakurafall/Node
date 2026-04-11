import express from 'express';
import cors from 'cors';

// Create express instance
const app = express();
app.use(cors());
app.use(express.json());


export default app;