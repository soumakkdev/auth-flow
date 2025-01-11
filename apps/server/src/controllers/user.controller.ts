import type { Context } from 'hono'
import UserServices from '../services/user.services.ts'
import { HTTPException } from 'hono/http-exception'

export async function getProfile(c: Context) {
	const userId = c.get('userId')
	const user = await UserServices.getUserById(userId)
	if (user) {
		return c.json({ data: user })
	} else {
		throw new HTTPException(400, { message: 'User not found' })
	}
}
