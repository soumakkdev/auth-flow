import InputField from '@/components/input/InputField'
import PasswordField from '@/components/input/PasswordField'
import { Button } from '@/components/ui/button'
import { useForm } from '@tanstack/react-form'
import { Mail, User2 } from 'lucide-react'
import { FormEvent } from 'react'

export default function Signup() {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			console.log(value)
			try {
				// console.log(res)
			} catch (error) {
				console.error(error)
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
				<h1 className="font-serif text-4xl font-bold text-center">Create an Account</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Welcome! Sign up to create your account and start your journey with us
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6 max-w-[440px] mx-auto">
				<InputField id="name" label="Name" placeholder="Enter your name" startIcon={<User2 size={16} />} />

				<InputField
					id="email"
					label="Email address"
					placeholder="Enter your email address"
					startIcon={<Mail size={16} />}
				/>

				<form.Field name="password">
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
						/>
					)}
				</form.Field>

				<Button size="lg" className="w-full">
					Cerate account
				</Button>
			</form>

			<p className="text-sm text-center mt-8">
				Already have an account?{' '}
				<a href="/login" className="text-primary underline">
					Login
				</a>
			</p>
		</div>
	)
}
