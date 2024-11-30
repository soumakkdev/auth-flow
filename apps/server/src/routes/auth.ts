import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { login, refreshToken, signup } from '../controllers/auth.controller.ts'
import { getProfile } from '../controllers/user.controller.ts'
import { authorize } from '../middleware/authorize.ts'
import { ZLoginReqBody, ZSignupReqBody } from '../types/auth.ts'

const app = new Hono()

app.post('/login', zValidator('json', ZLoginReqBody), login)
app.post('/signup', zValidator('json', ZSignupReqBody), signup)
app.get('/profile', authorize, getProfile)
app.post('/refresh', refreshToken)

export default app
