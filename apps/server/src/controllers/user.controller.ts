import type { Context } from 'hono'
import UserServices from '../services/user.services.ts'
import { HTTPException } from 'hono/http-exception'
import prisma from '../lib/prisma.ts'

export async function getProfileController(c: Context) {
	const userId = c.get('userId')
	const user = await UserServices.getUserById(userId)
	if (user) {
		return c.json({ data: user })
	} else {
		throw new HTTPException(400, { message: 'User not found' })
	}
}

export async function editProfileController(c: Context) {
	const body = await c.req.json()
	const userId = c.get('userId')

	const user = prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			profile: {
				create: {
					country: 'India',
				},
			},
		},
	})

	return c.json({})
}
