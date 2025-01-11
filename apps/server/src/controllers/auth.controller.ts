import bcrypt from 'bcrypt'
import type { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { generateToken, verifyToken } from '../lib/jwt.ts'
import UserServices from '../services/user.services.ts'
import sgMail from '@sendgrid/mail'
import { generateNanoid } from '../lib/helpers.ts'
import prisma from '../lib/prisma.ts'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function loginController(c: Context) {
	try {
		const { email, password } = await c.req.json()

		// check user exists or not
		const user = await UserServices.getUserByEmail(email)
		if (!user) {
			throw new HTTPException(400, { message: 'Incorrect username or password' })
		}

		// validate password
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw new HTTPException(401, { message: 'Incorrect username or password' })
		}

		// check if email is verified
		if (!user?.isVerified) {
			throw new HTTPException(401, { message: 'Email is not verified yet' })
		}

		// generate access and refresh token
		const payload = {
			userId: user.id,
		}
		const accessToken = await generateToken(payload, 30) // expired in 30 min
		const refreshToken = await generateToken(payload, 60 * 24) // expired in 1 day

		// set refresh token in cookie
		// const signature = process.env.COOKIE_SIGNATURE as string
		await setCookie(c, 'refresh_token', refreshToken, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 1, // 1 day
			sameSite: 'Strict',
		})

		return c.json({
			success: true,
			token: accessToken,
		})
	} catch (error: any) {
		throw new HTTPException(400, { message: error?.message ?? 'Login failed. Please try again' })
	}
}

export async function signupController(c: Context) {
	const { name, email, password } = await c.req.json()
	const verificationToken = generateNanoid()

	// check if user already exists or not
	const user = await UserServices.getUserByEmail(email)
	if (user) {
		throw new HTTPException(400, { message: 'Signup failed! User already exists' })
	}

	// generate hashed password
	const salt = 10
	const hashedPassword = await bcrypt.hash(password, salt)

	// save the new user data
	try {
		const newUser = {
			name,
			email,
			password: hashedPassword,
			verificationToken,
			tokenExpiry: Date.now() + 3600000, // 1hour
		}
		await UserServices.createUser(newUser)
	} catch (error) {
		throw new HTTPException(400, { message: 'Signup failed' })
	}

	// send mail
	const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
	const message = {
		to: email,
		from: {
			name: 'AuthFlow',
			email: 'authflow@yopmail.com',
		},
		subject: 'Verify your email address',
		html: `<p>Click the link below to verify your email</p>
		<a href="${verificationLink}">${verificationLink}</a>`,
	}
	await sgMail.send(message)

	return c.json({ success: true })
}

export async function verifyEmailController(c: Context) {
	const { token } = await c.req.json()

	// check if token exists in user
	const user = await prisma.users.findFirst({
		where: {
			verificationToken: token,
		},
	})

	// check if token expires or not
	if (!user || user.tokenExpiry < Date.now()) {
		throw new HTTPException(400, { message: 'Invalid or expired token' })
	}

	await prisma.users.update({
		where: { email: user.email },
		data: {
			isVerified: true,
			verificationToken: { unset: true },
			tokenExpiry: { unset: true },
		},
	})

	return c.json({ success: true, message: 'Email verified successfully' })
}

export async function refreshToken(c: Context) {
	const refreshToken = await getCookie(c, 'refresh_token')

	// no refresh token provided
	if (!refreshToken) {
		throw new HTTPException(401, { message: 'Invalid token' })
	}

	try {
		// verify refresh token
		const decoded = await verifyToken(refreshToken)

		// generate new access token
		const payload = {
			userId: decoded.userId,
		}
		const token = await generateToken(payload, 30)
		return c.json({ success: true, token })
	} catch (error) {
		// invalid refresh token
		throw new HTTPException(401, { message: 'Invalid token' })
	}
}
