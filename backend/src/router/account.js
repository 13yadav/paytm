import { Router } from 'express'
import { Account, User } from '../db/index.js'
import asyncHandler from 'express-async-handler'
import authenticate from '../middlewares/auth.js'
import zod from 'zod'
import mongoose from 'mongoose'

const router = Router()
router.use(authenticate)

// balance route

const balanceController = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ userId: req.userId })
  res.json({ balance: account.balance })
})

router.get('/balance', balanceController)

// transfer route

const transferValidator = asyncHandler(async (req, res, next) => {
  const TrasnferSchema = zod.object({
    to: zod.string(),
    amount: zod.number().positive(),
  })

  const validator = TrasnferSchema.safeParse(req.body)

  if (!validator.success) {
    return res.status(400).json(validator.error.flatten())
  }

  next()
})

const transferController = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession()

  session.startTransaction()

  const { to, amount } = req.body

  const account = await Account.findOne({ userId: req.userId }).session(session)

  if (!account || amount > account.balance) {
    await session.abortTransaction()
    return res.status(400).json({ message: 'Insufficient balance' })
  }

  const toAccount = await Account.findOne({ userId: to }).session(session)

  if (!toAccount) {
    await session.abortTransaction()
    return res.status(400).json({ message: 'Invalid account' })
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: { balance: -amount },
    }
  ).session(session)

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: { balance: amount },
    }
  ).session(session)

  await session.commitTransaction()
  res.json({ message: 'Transfer successful' })
})

router.post('/transfer', transferValidator, transferController)

export default router
