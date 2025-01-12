import { IFormData } from '@/app/onboarding/page'
import InputField from '@/components/input/InputField'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { authFetch } from '@/lib/utils'
import { IProfile, IUser } from '@/types/user.types'
import { useForm } from '@tanstack/react-form'
import React, { useEffect, useState } from 'react'

export default function EditAddressDialog({
	open,
	onClose,
	profile,
}: {
	open: boolean
	onClose: () => void
	profile: IProfile
}) {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<IFormData>({
		defaultValues: {
			phone: '',
			dob: '',
			address: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
		},
		onSubmit: async ({ value }) => {
			try {
				setIsLoading(true)
				const res = await authFetch('api/edit-profile', 'POST', value)
				console.log(res)
				onClose()
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		},
	})

	useEffect(() => {
		if (profile) {
			form.reset({
				address: profile.address,
				city: profile.city,
				state: profile.state,
				zipCode: profile.zipCode,
				country: profile.country,
				dob: '',
				phone: '',
			})
		}
	}, [profile])

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="space-y-6"
				>
					<DialogHeader>
						<DialogTitle>Edit address information</DialogTitle>
					</DialogHeader>

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

					<DialogFooter>
						<Button size="lg" className="w-full" type="submit" loading={isLoading}>
							Confirm
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
