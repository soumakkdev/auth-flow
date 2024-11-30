import prisma from '../lib/prisma.ts'
import type { ICreateUser } from '../types/auth.ts'

export default class UserServices {
	static async getUserByEmail(email: string) {
		return await prisma.users.findUnique({
			where: {
				email,
			},
		})
	}

	static async getUserById(id: string) {
		return await prisma.users.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		})
	}

	static async createUser(user: ICreateUser) {
		return await prisma.users.create({
			data: {
				email: user.email,
				name: user.name,
				password: user.password,
			},
		})
	}
}
