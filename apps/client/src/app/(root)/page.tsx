'use client'
import InfoText from '@/components/InfoText'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'
import { Pencil } from 'lucide-react'

export default function Home() {
	const { user } = useAuth()
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

							<Button className="mt-4" variant="outline">
								Logout
							</Button>
						</div>
					</div>

					<div className="border rounded-2xl p-8">
						<div className="flex items-center justify-between mb-8">
							<h2 className="font-medium text-lg">Profile Information</h2>
							<Pencil className="h-5 w-5" />
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div className="col-span-2">
								<InfoText label="Full Name" text={user?.name} />
							</div>
							<InfoText label="Email address" text={user?.email} />
							<InfoText label="Phone No" text="+91 76995 98595" />
							<InfoText label="Date of birth" text="5th Sept, 1934" />
							<InfoText label="Gender" text="Male" />
						</div>
					</div>

					<div className="border rounded-2xl p-8 my-10">
						<div className="flex items-center justify-between mb-8">
							<h2 className="font-medium text-lg">Address Information</h2>
							<Pencil className="h-5 w-5" />
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div className="col-span-2">
								<InfoText label="Address" text="2nd street, bose colony" />
							</div>
							<InfoText label="City" text="Kolkata" />
							<InfoText label="State" text="West Bengal" />
							<InfoText label="Zip code" text="745484" />
							<InfoText label="Country" text="India" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
