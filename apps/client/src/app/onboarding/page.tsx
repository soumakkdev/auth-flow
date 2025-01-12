'use client'
import AddressForm from '@/modules/onboarding/AddressForm'
import BasicInfoForm from '@/modules/onboarding/BasicInfoForm'
import { useForm } from '@tanstack/react-form'
import { FormEvent, useState } from 'react'

export interface IFormData {
	phone: string
	dob: string
	address: string
	city: string
	state: string
	zipCode: string
	country: string
}

export default function OnboardingPage() {
	const [currentStep, setCurrentStep] = useState(0)

	function handleNextStep() {
		setCurrentStep((c) => c + 1)
	}

	function handlePrevStep() {
		setCurrentStep((c) => c - 1)
	}

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
		onSubmit: ({ value }) => {
			console.log(value)
		},
	})

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return (
		<form onSubmit={handleSubmit}>
			{currentStep === 0 ? (
				<BasicInfoForm form={form} onNext={handleNextStep} />
			) : (
				<AddressForm form={form} onBack={handlePrevStep} />
			)}
		</form>
	)
}
