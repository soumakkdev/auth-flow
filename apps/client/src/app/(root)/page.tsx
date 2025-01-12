'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'
import AddressInfo from '@/modules/profile/AddressInfo'
import PersonalInfo from '@/modules/profile/PersonalInfo'
import { logout } from '@/services/auth.api'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'

export default function Home() {
	const { user, loading } = useAuth()
	const router = useRouter()

	async function handleLogout() {
		await logout()
		nookies.destroy(null, 'access_token')
		router.push('/login')
	}

	if (!user) {
		return null
	}

	return (
		<div>
			<div className="relative">
				<figure className="p-5 h-[30vh]">
					<img src="/home-banner.png" alt="Cover image" className="h-full w-full object-cover rounded-xl" />
				</figure>

				<div className="max-w-4xl mx-auto">
					<div className="flex gap-10">
						<figure className="relative bottom-16">
							<img
								src="/avatar.jpg"
								alt="avatar"
								className="h-48 w-48 object-cover rounded-full border-[6px] border-white"
							/>
						</figure>

						<div className="mt-2">
							<h1 className="text-4xl font-serif font-bold">{user?.name}</h1>
							<p className="mt-2 text-muted-foreground">{user?.email}</p>

							<Button className="mt-4" variant="outline" onClick={handleLogout}>
								Logout
							</Button>
						</div>
					</div>

					<PersonalInfo user={user} />

					<AddressInfo profile={user?.profile} />
				</div>
			</div>
		</div>
	)
}
