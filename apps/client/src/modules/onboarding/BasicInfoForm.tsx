import { IFormData } from '@/app/onboarding/page'
import { DatePicker } from '@/components/input/DatePicker'
import PhoneField from '@/components/input/PhoneField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ReactFormExtendedApi } from '@tanstack/react-form'

export default function BasicInfoForm({
	form,
	onNext,
	onSkip,
}: {
	form: ReactFormExtendedApi<IFormData>
	onNext: () => void
	onSkip: () => void
}) {
	async function handleNext() {
		// const errors = await form.validateField('phone', 'change')
		onNext()
	}

	return (
		<div className="space-y-6 max-w-[440px] mx-auto py-12">
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Let’s Get to Know You!</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Enter your details to complete the setup process
				</p>
			</div>

			<form.Field
				name="phone"
				// TODO: validate phone number
				// validators={{
				// 	onChange: ({ value }) => {
				// 		console.log(value)
				// 		if (value && !isValidNumber(value)) {
				// 			return 'Invalid phone'
				// 		}
				// 	},
				// }}
			>
				{(field) => (
					<PhoneField
						placeholder="Enter phone number"
						id={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(value) => field.handleChange(value)}
						label="Phone Number"
						error={field.state.meta.errors.join(', ')}
					/>
				)}
			</form.Field>

			<div className="space-y-2">
				<Label>Date of birth</Label>
				<DatePicker />
			</div>

			<div className="space-y-4">
				<Button size="lg" className="w-full" onClick={handleNext}>
					Next
				</Button>

				<Button size="lg" variant="outline" className="w-full" onClick={onSkip}>
					Skip
				</Button>
			</div>
		</div>
	)
}
