'use client'

import { verifyEmail } from '@/services/auth.api'
import { Loader } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import nookies from 'nookies'

export default function VerifyEmail() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const [error, setError] = useState('')
	const router = useRouter()

	useEffect(() => {
		if (token) {
			verifyEmail(token)
				.then((res) => {
					nookies.set(null, 'access_token', res.token)
					router.push('/onboarding')
				})
				.catch((error: any) => {
					setError(error?.message ?? 'Email verification failed!')
				})
		}
	}, [token, router])

	return (
		<div className="min-h-svh grid place-content-center">
			{error ? <p className="font-serif text-2xl">{error}</p> : <Loader className="animate-spin" />}
		</div>
	)
}
