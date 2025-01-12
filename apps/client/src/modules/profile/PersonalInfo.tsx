import InfoText from '@/components/InfoText'
import { IUser } from '@/types/user.types'
import { Pencil } from 'lucide-react'
import React from 'react'

export default function PersonalInfo({ user }: { user: IUser }) {
	return (
		<div className="border rounded-2xl p-8">
			<div className="flex items-center justify-between mb-8">
				<h2 className="font-medium text-lg">Personal Information</h2>
				<Pencil className="h-5 w-5" />
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div className="col-span-2">
					<InfoText label="Full Name" text={user?.name} />
				</div>
				<InfoText label="Email address" text={user?.email} />
				<InfoText label="Phone No" text={user?.profile?.phone} />
				<InfoText label="Date of birth" text="5th Sept, 1934" />
				<InfoText label="Gender" text="Male" />
			</div>
		</div>
	)
}
