export function getUrl(url: string) {
	return `${import.meta.env.VITE_SERVER_URL}/${url}`
}

export async function login(email: string, password: string) {
	const res = await fetch(getUrl('api/login'), {
		method: 'POST',
		credentials: 'include', // Ensures cookies are sent with the request
		body: JSON.stringify({
			email,
			password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}

export async function signup(name: string, email: string, password: string) {
	const res = await fetch(getUrl('api/signup'), {
		method: 'POST',
		credentials: 'include', // Ensures cookies are sent with the request
		body: JSON.stringify({
			name,
			email,
			password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}
