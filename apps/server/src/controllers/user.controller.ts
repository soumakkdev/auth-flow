import type { Context } from 'hono'
import UserServices from '../services/user.services.ts'

export async function getProfile(c: Context) {
	const userId = c.get('userId')
	const user = await UserServices.getUserById(userId)
	return c.json({ data: user })
}
