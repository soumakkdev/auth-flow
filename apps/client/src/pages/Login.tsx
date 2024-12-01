import InputField from '@/components/input/InputField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function Login() {
	return (
		<div>
			<div className="mb-16">
				<h1 className="font-serif text-4xl font-bold text-center">Welcome back</h1>
				<p className="text-sm text-muted-foreground mt-2 text-center">
					Log in to access your account and stay connected
				</p>
			</div>

			<div className="space-y-6">
				<InputField id="email" label="Email address" placeholder="Enter your email address" />

				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<Label htmlFor="password">Password</Label>
						<a href="#" className="text-xs underline text-primary">
							Forgot password?
						</a>
					</div>
					<InputField id="password" type="password" placeholder="Enter the password" />
				</div>

				<Button size="lg" className="w-full">
					Sign in
				</Button>
			</div>
		</div>
	)
}
