export function getUrl(url: string) {
	return `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`
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

export async function verifyEmail(token: string) {
	const res = await fetch(getUrl('api/verify-email'), {
		method: 'POST',
		credentials: 'include', // Ensures cookies are sent with the request
		body: JSON.stringify({
			token,
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

export async function logout() {
	const res = await fetch(getUrl('api/logout'), {
		credentials: 'include', // Ensures cookies are sent with the request
		method: 'POST',
	})

	if (!res.ok) {
		const error = await res.json()
		throw new Error(error.error ?? 'An unexpected error occurred')
	}

	return await res.json()
}

// async function handleLogin() {
// 	const res = await fetch('http://localhost:5000/api/login', {
// 		method: 'POST',
// 		credentials: 'include', // Ensures cookies are sent with the request
// 		body: JSON.stringify({
// 			email: 'soumakkdutta@gmail.com',
// 			password: 'Aa@123456',
// 		}),
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	})
// 	const data = await res.json()
// 	localStorage.setItem('access_token', data.token)
// }

// async function handleProfile() {
// 	const res = await fetch('http://localhost:5000/api/profile', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${localStorage.getItem('access_token')}`,
// 		},
// 	})
// 	if (res.status === 401) {
// 		return await refreshAccessToken()
// 	}
// 	const data = await res.json()
// 	return data
// }

// async function refreshAccessToken() {
// 	const res1 = await fetch('http://localhost:5000/api/refresh', {
// 		method: 'POST',
// 		credentials: 'include',
// 	})
// 	const data = await res1.json()
// 	const token = data.token
// 	localStorage.setItem('access_token', data.token)

// 	const res2 = await fetch('http://localhost:5000/api/profile', {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	})
// 	return res2.json()
// }
