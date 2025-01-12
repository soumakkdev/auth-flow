'use client'
import { authFetch } from '@/lib/utils'
import AddressForm from '@/modules/onboarding/AddressForm'
import BasicInfoForm from '@/modules/onboarding/BasicInfoForm'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
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
	const router = useRouter()
	const [currentStep, setCurrentStep] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

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
		onSubmit: async ({ value }) => {
			try {
				setIsLoading(true)
				const res = await authFetch('api/edit-profile', 'POST', value)
				console.log(res)
				router.push('/')
			} catch (error) {
				console.log(error)
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
		<form onSubmit={handleSubmit}>
			{currentStep === 0 ? (
				<BasicInfoForm form={form} onNext={handleNextStep} onSkip={() => router.push('/')} />
			) : (
				<AddressForm form={form} onBack={handlePrevStep} isSubmitting={isLoading} />
			)}
		</form>
	)
}
