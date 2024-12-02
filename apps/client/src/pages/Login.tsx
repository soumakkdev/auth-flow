import GithubIcon from '@/assets/GithubIcon'
import GoogleIcon from '@/assets/GoogleIcon'
import InputField from '@/components/input/InputField'
import PasswordField from '@/components/input/PasswordField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Mail } from 'lucide-react'

export default function Login() {
	return (
		<div>
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Welcome back</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Log in to access your account and stay connected
				</p>
			</div>

			<div className="space-y-6 max-w-[440px] mx-auto">
				<InputField
					id="email"
					label="Email address"
					placeholder="Enter your email address"
					startIcon={<Mail size={16} />}
				/>

				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<Label htmlFor="password">Password</Label>
						<a href="#" className="text-xs underline text-primary">
							Forgot password?
						</a>
					</div>
					<PasswordField id="password" placeholder="Enter the password" showLockIcon />
				</div>

				<Button size="lg" className="w-full">
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
			</div>

			<p className="text-sm text-center mt-8">
				Don't have an account?{' '}
				<a href="/signup" className="text-primary underline">
					Sign up
				</a>
			</p>
		</div>
	)
}
