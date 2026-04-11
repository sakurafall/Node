import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());

const port = process.env.PORT;

app.get('/', async (req, res) => {
  console.log('HA HA HA HA -')
  return res.status(200).json('Hello World')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})