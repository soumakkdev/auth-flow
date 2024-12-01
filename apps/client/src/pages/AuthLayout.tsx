import { Outlet } from 'react-router'

export default function AuthLayout() {
	return (
		<div className="grid grid-cols-3">
			<figure className="p-4 h-screen">
				<img src="/login-banner.jpg" alt="Login banner image" className="rounded-xl h-full object-cover" />
			</figure>
			<div className="col-span-2 h-full">
				<div className="h-full grid place-content-center">
					<Outlet />
				</div>
			</div>
		</div>
	)
}
