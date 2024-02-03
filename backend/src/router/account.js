import { Router } from 'express'
import { Account } from '../db/index.js'
import asyncHandler from 'express-async-handler'
import authenticate from '../middlewares/auth.js'

const router = Router()
router.use(authenticate)

const balanceController = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ userId: req.userId })
  res.json({ balance: account.balance })
})

router.get('/balance', balanceController)

export default router
