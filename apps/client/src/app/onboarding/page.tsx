'use client'
import { DatePicker } from '@/components/input/DatePicker'
import InputField from '@/components/input/InputField'
import PhoneField from '@/components/input/PhoneField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

export default function OnboardingPage() {
	return (
		<div className="space-y-6 max-w-[440px] mx-auto py-10">
			<div className="mb-12">
				<h1 className="font-serif text-4xl font-bold text-center">Let’s Get to Know You!</h1>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					Enter your details to complete the setup process
				</p>
			</div>

			<PhoneField />

			<div className="space-y-2">
				<Label>Date of birth</Label>
				<DatePicker />
			</div>

			<Button size="lg" className="w-full">
				Next
			</Button>
		</div>
	)
}
