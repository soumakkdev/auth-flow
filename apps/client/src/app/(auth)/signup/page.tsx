'use client'

import InputField from '@/components/input/InputField'
import PasswordField from '@/components/input/PasswordField'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { signup } from '@/services/auth.api'
import { useForm } from '@tanstack/react-form'
import { AlertCircle, Mail, User2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Signup() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			cPassword: '',
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true)
			setError('')
			try {
				const res = await signup(value.name, value.email, value.password)
				router.push('/login')
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
		<div className="py-16">
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Create an Account</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Welcome! Sign up to create your account and start your journey with us
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6 max-w-[440px] mx-auto">
				{error ? (
					<Alert variant="error">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>{error}</AlertTitle>
					</Alert>
				) : null}

				<form.Field
					name="name"
					validators={{
						onSubmit: ({ value }) => (!value ? 'Name is a required field' : undefined),
					}}
				>
					{(field) => (
						<InputField
							id={field.name}
							label="Name"
							placeholder="Enter your name"
							startIcon={<User2 size={16} />}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>

				<form.Field
					name="email"
					validators={{
						onSubmit: ({ value }) => (!value ? 'Email is a required field' : undefined),
					}}
				>
					{(field) => (
						<InputField
							id={field.name}
							label="Email address"
							placeholder="Enter your email address"
							startIcon={<Mail size={16} />}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>

				<form.Field
					name="password"
					validators={{
						onSubmit: ({ value }) => (!value ? 'Password is a required field' : undefined),
					}}
				>
					{(field) => (
						<PasswordField
							label="Password"
							placeholder="Enter the password"
							showLockIcon
							showStrength
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>

				<form.Field
					name="cPassword"
					validators={{
						onChange: ({ value, fieldApi }) => {
							if (fieldApi.form.state.values.password !== value) return "Password doesn't match"
						},
					}}
				>
					{(field) => (
						<PasswordField
							label="Confirm Password"
							placeholder="Enter the password again"
							showLockIcon
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>

				<Button loading={isLoading} size="lg" className="w-full">
					Create account
				</Button>
			</form>

			<p className="text-sm text-center mt-8">
				Already have an account?{' '}
				<Link href="/login" className="text-primary underline">
					Login
				</Link>
			</p>
		</div>
	)
}
