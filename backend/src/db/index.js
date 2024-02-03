import mongoose from 'mongoose'
import { MONGO_URL } from '../config/index.js'
import bcryptjs from 'bcryptjs'

connectToDB().catch((err) =>
  console.error('Could not connect to MongoDB...', err)
)

async function connectToDB() {
  await mongoose.connect(MONGO_URL)

  console.log('Connected to MongoDB...')
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 255,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 1,
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

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})

const Account = mongoose.model('Account', accountSchema)

export default connectToDB

export { User, Account }
