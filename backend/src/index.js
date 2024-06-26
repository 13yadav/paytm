import express from 'express'
import cors from "cors"
import router from './router/index.js'
import { PORT, FRONTEND_URL } from './config/index.js'
import errorHandler from "./middlewares/errorHandler.js"

const app = express()
const corsOptions = { origin: FRONTEND_URL }
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true }));

app.use('/api/v1', router)

// global error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
