import type { Context } from 'hono'
import UserServices from '../services/user.services.ts'
import { HTTPException } from 'hono/http-exception'
import prisma from '../lib/prisma.ts'
import type { IEditProfileReq } from '../types/user.ts'

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
	const body = (await c.req.json()) as IEditProfileReq
	const userId = c.get('userId')

	try {
		const userProfile = await prisma.profile.findFirst({
			where: {
				userId,
			},
		})

		if (userProfile) {
			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					profile: {
						update: body,
					},
				},
			})
		} else {
			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					profile: {
						create: body,
					},
				},
			})
		}

		return c.json({ success: true })
	} catch (error) {
		throw new HTTPException(400, { message: 'Internal server error' })
	}
}
