import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('hello there')
})

export default router
