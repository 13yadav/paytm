import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.send("Hello duniya")
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
