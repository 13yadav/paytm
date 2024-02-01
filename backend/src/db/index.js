import mongoose from 'mongoose'
import { MONGO_URL } from '../config/index.js'
import bcryptjs from "bcryptjs"

connectToDB().catch((err) => console.error('Could not connect to MongoDB...', err))

async function connectToDB() {
  await mongoose.connect(MONGO_URL)

  console.log('Connected to MongoDB...')
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.createHash = async function (plainTextPassword) {
  const saltRounds = 10
  const salt = await bcryptjs.genSalt(saltRounds)
  const hashedPassword = await bcryptjs.hash(plainTextPassword, salt)
  return hashedPassword
}

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default connectToDB;

export { User }
