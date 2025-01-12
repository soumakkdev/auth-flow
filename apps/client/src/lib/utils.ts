import { getUrl } from '@/services/auth.api'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import nookies from 'nookies'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function authFetch(url: string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body?: object) {
	const cookies = nookies.get(null)

	const res = await fetch(getUrl(url), {
		method,
		credentials: 'include',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.access_token}`,
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}
