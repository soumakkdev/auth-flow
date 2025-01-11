import React, { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid grid-cols-3">
			<figure className="p-4 h-screen w-full sticky top-0">
				<img
					src="/login-banner.jpg"
					alt="Login banner image"
					className="rounded-xl w-full h-full object-cover"
				/>
			</figure>
			<div className="col-span-2 h-full">
				<div className="h-full grid place-content-center">{children}</div>
			</div>
		</div>
	)
}
