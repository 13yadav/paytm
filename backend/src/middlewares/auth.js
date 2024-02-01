import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { JWT_SECRET } from '../config/index.js'

const authenticate = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401)
    throw new Error('Unauthorized')
  }

  const authToken = authorization.split(' ')[1]
  const decoded = jwt.verify(authToken, JWT_SECRET)

  if (decoded) {
    req.userId = decoded.userId
    return next()
  } else {
    res.status(401)
    throw new Error('Unauthorized')
  }
})

export default authenticate
