'use client'

import GithubIcon from '@/assets/GithubIcon'
import GoogleIcon from '@/assets/GoogleIcon'
import InputField from '@/components/input/InputField'
import PasswordField from '@/components/input/PasswordField'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { login } from '@/services/auth.api'
import { useForm } from '@tanstack/react-form'
import { AlertCircle, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import nookies from 'nookies'

export default function Login() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const form = useForm({
		defaultValues: {
			email: 'soumakkdutta@gmail.com',
			password: 'Aa@123456',
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true)
			setError('')
			try {
				const res = await login(value.email, value.password)
				nookies.set(null, 'access_token', res.token)
				router.push('/')
			} catch (error: any) {
				setError(error?.message)
			} finally {
				setIsLoading(false)
			}
		},
	})

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return (
		<div>
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Welcome back</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Log in to access your account and stay connected
				</p>
			</div>

			<form className="space-y-6 max-w-[440px] mx-auto" onSubmit={handleSubmit}>
				{error ? (
					<Alert variant="error">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				) : null}

				<form.Field name="email">
					{(field) => (
						<InputField
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							label="Email address"
							placeholder="Enter your email address"
							startIcon={<Mail size={16} />}
						/>
					)}
				</form.Field>

				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<Label htmlFor="password">Password</Label>
						<a href="#" className="text-xs underline text-primary">
							Forgot password?
						</a>
					</div>
					<form.Field name="password">
						{(field) => (
							<PasswordField
								placeholder="Enter the password"
								showLockIcon
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						)}
					</form.Field>
				</div>

				<Button size="lg" className="w-full" loading={isLoading}>
					Sign in
				</Button>

				<div className="space-y-4">
					<Button className="w-full" size="lg" variant="outline">
						<GoogleIcon />
						<span>Sign in with Google</span>
					</Button>

					<Button className="w-full" size="lg" variant="outline">
						<GithubIcon />
						<span>Sign in with GitHub</span>
					</Button>
				</div>
			</form>

			<p className="text-sm text-center mt-8">
				Don't have an account?{' '}
				<Link href="/signup" className="text-primary underline">
					Sign up
				</Link>
			</p>
		</div>
	)
}
