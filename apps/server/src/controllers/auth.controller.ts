import bcrypt from 'bcrypt'
import type { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { generateToken, verifyToken } from '../lib/jwt.ts'
import UserServices from '../services/user.services.ts'

export async function login(c: Context) {
	try {
		const { email, password } = await c.req.json()

		// check user exists or not
		const user = await UserServices.getUserByEmail(email)
		if (!user) {
			throw new HTTPException(400, { message: "Login failed! User doesn't exists" })
		}

		// validate password
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw new HTTPException(401, { message: 'Login failed! Invalid credentials' })
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
	} catch (error) {
		throw new HTTPException(400, { message: 'Signup failed', cause: error })
	}
}

export async function signup(c: Context) {
	const { name, email, password } = await c.req.json()

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
		}
		await UserServices.createUser(newUser)
	} catch (error) {
		throw new HTTPException(400, { message: 'Signup failed' })
	}

	return c.json({ success: true })
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
