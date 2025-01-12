export interface IUser {
	id: string
	name: string
	email: string
	createdAt: string
	updatedAt: string
	profile: IProfile
}

export interface IProfile {
	id: string
	phone: string
	dob: string
	address: string
	city: string
	state: string
	zipCode: string
	country: string
	userId: string
}
