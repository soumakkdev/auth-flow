function getUrl(url: string) {
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
	return await res.json()
}
