import 'dotenv/config'

const PORT = process.env.PORT || 8000

const MONGO_URL = process.env.MONGO_URL

const JWT_SECRET = process.env.JWT_SECRET

export { PORT, MONGO_URL, JWT_SECRET }