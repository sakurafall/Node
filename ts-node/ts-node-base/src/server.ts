import express from 'express';
import type { Express, Response } from 'express';
import type URLRequest from './types/URLRequest.js';

import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.get('/', (req: URLRequest, res: Response) => {
  const body = req.body;

  console.log(body)

  res.send("Hello World");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})