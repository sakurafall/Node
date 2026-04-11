import express from 'express'
import cors from 'cors'
import { readFile } from 'node:fs/promises'

const app = express()
app.use(cors())
const port = 3000

app.get('/todos', async (_req, res) => {
  const todos = await readFile('./data.json', 'utf-8')
  console.log('todos', todos)
  const todosData = JSON.parse(todos)
  console.log('todosData', todosData)
  return res.status(200).json(todosData)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})