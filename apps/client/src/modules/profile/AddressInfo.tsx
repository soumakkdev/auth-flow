import InfoText from '@/components/InfoText'
import { IProfile } from '@/types/user.types'
import { Pencil } from 'lucide-react'
import EditAddressDialog from './EditAddressDialog'
import { useState } from 'react'

export default function AddressInfo({ profile }: { profile: IProfile }) {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	return (
		<div className="border rounded-2xl p-8 my-10">
			<div className="flex items-center justify-between mb-8">
				<h2 className="font-medium text-lg">Address Information</h2>
				<Pencil className="h-5 w-5 cursor-pointer" onClick={() => setIsEditDialogOpen(true)} />
			</div>

			<div className="grid grid-cols-2 gap-6">
				<div className="col-span-2">
					<InfoText label="Address" text={profile?.address} />
				</div>
				<InfoText label="City" text={profile?.city} />
				<InfoText label="State" text={profile?.state} />
				<InfoText label="Zip code" text={profile?.zipCode} />
				<InfoText label="Country" text={profile?.country} />
			</div>

			{isEditDialogOpen && (
				<EditAddressDialog
					open={isEditDialogOpen}
					onClose={() => setIsEditDialogOpen(false)}
					profile={profile}
				/>
			)}
		</div>
	)
}
