import { Hono } from 'hono'
import { editProfileController, getProfileController } from '../controllers/user.controller.ts'
import { authorize } from '../middleware/authorize.ts'
import { zValidator } from '@hono/zod-validator'
import { ZEditProfileReq } from '../types/user.ts'

const app = new Hono()

app.get('/profile', authorize, getProfileController)
app.post('/edit-profile', authorize, zValidator('json', ZEditProfileReq), editProfileController)

export default app
