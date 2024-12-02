import InputField from '@/components/input/InputField'
import PasswordField from '@/components/input/PasswordField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Mail, User2 } from 'lucide-react'

export default function Signup() {
	return (
		<div>
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Create an Account</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Welcome! Sign up to create your account and start your journey with us
				</p>
			</div>

			<div className="space-y-6 max-w-[440px] mx-auto">
				<InputField id="name" label="Name" placeholder="Enter your name" startIcon={<User2 size={16} />} />

				<InputField
					id="email"
					label="Email address"
					placeholder="Enter your email address"
					startIcon={<Mail size={16} />}
				/>

				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<Label htmlFor="password">Password</Label>
					</div>
					<PasswordField id="password" placeholder="Enter the password" showLockIcon />
				</div>

				<Button size="lg" className="w-full">
					Cerate account
				</Button>
			</div>

			<p className="text-sm text-center mt-8">
				Already have an account?{' '}
				<a href="/login" className="text-primary underline">
					Login
				</a>
			</p>
		</div>
	)
}
