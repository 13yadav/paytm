import 'dotenv/config'

const PORT = process.env.PORT || 8000

const MONGO_URL = process.env.MONGO_URL

const JWT_SECRET = process.env.JWT_SECRET

const FRONTEND_URL = process.env.FRONTEND_URL

export { PORT, MONGO_URL, JWT_SECRET, FRONTEND_URL }
