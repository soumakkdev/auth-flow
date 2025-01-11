import { Button } from '@/components/ui/button'

export default function Home() {
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
							<h1 className="text-4xl font-serif font-bold">Soumak</h1>
							<p className="mt-2 text-muted-foreground">soumak@yopmail.com</p>

							<Button className="mt-4" variant="outline">
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
