import prisma from '../lib/prisma.ts'
import type { ICreateUser } from '../types/auth.ts'

export default class UserServices {
	static async getUserByEmail(email: string) {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		})
	}

	static async getUserById(id: string) {
		return await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true,
				profile: true,
			},
		})
	}

	static async createUser(user: ICreateUser) {
		return await prisma.user.create({
			data: {
				email: user.email,
				name: user.name,
				password: user.password,
				verificationToken: user?.verificationToken,
				tokenExpiry: user?.tokenExpiry,
			},
		})
	}
}
