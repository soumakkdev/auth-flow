import { getUrl } from '@/services/auth.api'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		async function fetchProfile() {
			const res = await fetch(getUrl('api/profile'), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			})
			// if (res.status === 401) {
			// 	return await refreshAccessToken()
			// }
			const data = await res.json()
			setProfile(data?.data)

			setLoading(false)
			// return data
		}

		fetchProfile()
	}, [])

	const contextValue = {
		profile,
		loading,
	}

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
