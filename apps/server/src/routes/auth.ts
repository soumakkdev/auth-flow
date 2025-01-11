import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import {
	loginController,
	refreshToken,
	signupController,
	verifyEmailController,
} from '../controllers/auth.controller.ts'
import { getProfile } from '../controllers/user.controller.ts'
import { authorize } from '../middleware/authorize.ts'
import { ZLoginReqBody, ZSignupReqBody, ZVerifyEmailReqBody } from '../types/auth.ts'

const app = new Hono()

app.post('/login', zValidator('json', ZLoginReqBody), loginController)
app.post('/signup', zValidator('json', ZSignupReqBody), signupController)
app.post('/verify-email', zValidator('json', ZVerifyEmailReqBody), verifyEmailController)
app.get('/profile', authorize, getProfile)
app.post('/refresh', refreshToken)

export default app
