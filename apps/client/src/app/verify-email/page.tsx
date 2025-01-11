import { verifyEmail } from '@/services/auth.api'
import React from 'react'

export default async function VerifyEmail({ searchParams }: { searchParams: Promise<{ token: string }> }) {
	const token = (await searchParams).token

	try {
		const res = await verifyEmail(token)
		return (
			<div className="min-h-svh grid place-content-center">
				<p className="font-serif text-2xl">Email verified successfully!</p>
			</div>
		)
	} catch (error: any) {
		return (
			<div className="min-h-svh grid place-content-center">
				<p className="font-serif text-2xl">{error?.message}</p>
			</div>
		)
	}
}
