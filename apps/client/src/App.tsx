import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import AuthLayout from './pages/AuthLayout'
import Login from './pages/Login'

function App() {
	return (
		<Routes>
			<Route index path="/" element={<Home />} />

			<Route element={<AuthLayout />}>
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	)
}

export default App

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
