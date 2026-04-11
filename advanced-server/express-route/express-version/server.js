import express from 'express'
import { readFile } from 'node:fs/promises'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:idolName', async (reqest, response) => {
  // Get param
  const { idolName } = reqest.params

  // Read data
  const idolDataText = await readFile('./data.json', 'utf-8')
  const idolData = JSON.parse(idolDataText)

  // Find matched data
  const resultIdol = idolData.find(idol => idol.name.toUpperCase() === idolName.toUpperCase())

  // Without matched data
  if (!resultIdol) {
    return response.status(404).send('404 Not Found\n')
  }

  return response.status(200).json(resultIdol)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
