import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import authRouter from './routes/auth.ts'
import userRouter from './routes/user.ts'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(logger())
app.use(
	'/api/*',
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
)

app.get('/', (c) => {
	return c.text('Hello Hono!')
})

app.route('/api/', authRouter)
app.route('/api/', userRouter)

app.onError((err, c) => {
	const status = (err as any)?.status ?? 500
	return c.json(
		{
			success: false,
			error: err.message ?? 'An unexpected error occurred',
			cause: err.cause,
		},
		status
	)
})

const port = 5000
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port,
})
