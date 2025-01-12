import { IFormData } from '@/app/onboarding/page'
import InputField from '@/components/input/InputField'
import { Button } from '@/components/ui/button'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import React from 'react'

export default function AddressForm({ form, onBack }: { form: ReactFormExtendedApi<IFormData>; onBack: () => void }) {
	return (
		<div className="max-w-[440px] mx-auto py-12">
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Let’s Get to Know You!</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Enter your details to complete the setup process
				</p>
			</div>

			<div className="space-y-4">
				<form.Field name="address">
					{(field) => (
						<InputField
							id={field.name}
							label="Address"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>

				<form.Field name="city">
					{(field) => (
						<InputField
							label="City"
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>

				<div className="grid grid-cols-2 gap-4">
					<form.Field name="state">
						{(field) => (
							<InputField
								label="State"
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								error={field.state.meta.errors.join(', ')}
							/>
						)}
					</form.Field>

					<form.Field name="zipCode">
						{(field) => (
							<InputField
								label="Zip Code"
								id={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								error={field.state.meta.errors.join(', ')}
							/>
						)}
					</form.Field>
				</div>

				<form.Field name="country">
					{(field) => (
						<InputField
							label="Country"
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							error={field.state.meta.errors.join(', ')}
						/>
					)}
				</form.Field>
			</div>

			<div className="space-y-4 mt-6">
				<Button size="lg" className="w-full" type="submit">
					Next
				</Button>

				<Button size="lg" variant="outline" className="w-full" onClick={onBack}>
					Back
				</Button>
			</div>
		</div>
	)
}
