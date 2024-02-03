import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import zod from 'zod'
import { Account, User } from '../db/index.js'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'
import authenticate from '../middlewares/auth.js'

const router = Router()

// start: signup route
const signupValidator = asyncHandler(async (req, res, next) => {
  const SignUpSchema = zod.object({
    firstName: zod.string().min(2).max(255).trim(),
    lastName: zod.string().min(1).max(255).trim(),
    email: zod.string().email().trim().toLowerCase(),
    password: zod.string().min(6).max(20),
  })

  const validator = SignUpSchema.safeParse(req.body)
  if (!validator.success) {
    return res.status(400).json(validator.error.flatten())
  }

  next()
})

const signupController = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email: email })
  if (userExists) {
    return res
      .status(400)
      .json({ message: 'User with this email already exists' })
  }

  const user = new User({ firstName, lastName, email })

  const hashedPassword = await user.createHash(password)
  user.password = hashedPassword

  await user.save()

  await Account.create({
    userId: user._id,
    // adding random balance to user's account and multiplying 100 for 2 decimal precision
    balance: (Math.floor(1 + Math.random() * 10000)) * 100,
  })

  const token = jwt.sign({ userId: user._id }, JWT_SECRET)

  return res.status(201).json({
    message: 'User created successfully',
    token: token,
  })
})

router.post('/signup', signupValidator, signupController)
// end: signup route

// start: signin route
const signinValidator = asyncHandler(async (req, res, next) => {
  const SignInSchema = zod.object({
    email: zod.string().email().trim().toLowerCase(),
    password: zod.string(),
  })

  const validator = SignInSchema.safeParse(req.body)
  if (!validator.success) {
    return res.status(400).json(validator.error.flatten())
  }

  next()
})

const signinController = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email: email })
  if (!userExists) {
    return res.status(404).json({ message: 'Invalid email or password' })
  }

  const validPassword = await userExists.validatePassword(password)
  if (!validPassword) {
    return res.status(404).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ userId: userExists._id }, JWT_SECRET)

  return res.json({ token: token })
})

router.post('/signin', signinValidator, signinController)
// end: signin route

// start: user profile route
const userProfileValidator = asyncHandler(async (req, res, next) => {
  const UserProfileSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
  })

  const validator = UserProfileSchema.safeParse(req.body)

  if (!validator.success) {
    return res.status(400).json(validator.error.flatten())
  }

  next()
})

const userProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found!' })
  }

  if (req.body.firstName) {
    user.firstName = req.body.firstName
  }
  if (req.body.lastName) {
    user.lastName = req.body.lastName
  }
  if (req.body.password) {
    user.password = await user.createHash(req.body.password)
  }

  user.save()

  return res.status(200).json({ message: 'Account updated successfully' })
})

router.put('/', authenticate, userProfileValidator, userProfileController)
// end: user profile route

// Route to get users, filterable via firstName/lastName
const getUsersController = asyncHandler(async (req, res) => {
  const filter = req.query.filter || ''

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: 'i' } },
      { lastName: { $regex: filter, $options: 'i' } },
    ],
    _id: { $ne: req.userId },
  })

  res.json({
    users: users.map((user) => ({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  })
})

router.get('/bulk', authenticate, getUsersController)

export default router
